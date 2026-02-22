import names from '../data/config/names.json' assert { type: 'json' };

export default class TestDataGenerator {

  // =========================================================
  // RANDOM NUMBER
  // =========================================================
  randomNumber({ length = 5, min = 0, max = 9 } = {}) {
    if (min > max) {
      throw new Error(`min (${min}) cannot be greater than max (${max})`);
    }

    let result = '';

    for (let i = 0; i < length; i++) {
      const digit = Math.floor(Math.random() * (max - min + 1)) + min;
      result += digit;
    }

    return result;
  }

  // =========================================================
  // READABLE RANDOM TEXT (human-like word generator)
  // =========================================================

  vowels = ['a','e','i','o','u'];
  consonants = [
    'b','c','d','f','g','h','j','k','l','m',
    'n','p','r','s','t','v','z'
  ];

  _randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  randomText({ length = 8, capitalize = false } = {}) {

    let text = '';
    let consonantStreak = 0;

    for (let i = 0; i < length; i++) {

      let char;

      // két mássalhangzó után kötelező magánhangzó
      if (consonantStreak >= 2) {
        char = this._randomFrom(this.vowels);
        consonantStreak = 0;
      } else {
        // 60% eséllyel magánhangzó → olvashatóbb
        if (Math.random() < 0.6) {
          char = this._randomFrom(this.vowels);
          consonantStreak = 0;
        } else {
          char = this._randomFrom(this.consonants);
          consonantStreak++;
        }
      }

      text += char;
    }

    if (capitalize) {
      text = text.charAt(0).toUpperCase() + text.slice(1);
    }

    return text;
  }

  // =========================================================
  // NAMES
  // =========================================================

  randomFirstName() {
    return this._randomFrom(names.firstNames);
  }

  randomLastName() {
    return this._randomFrom(names.lastNames);
  }

  randomFullName() {
    return `${this.randomFirstName()} ${this.randomLastName()}`;
  }

  // =========================================================
  // DATE
  // =========================================================

  getCurrentDate({ addDays = 0, format = '-' } = {}) {

    const date = new Date();
    date.setDate(date.getDate() + addDays);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}${format}${mm}${format}${dd}`;
  }

  // =========================================================
  // DATETIME
  // =========================================================

  getCurrentDateTime({ addDays = 0 } = {}) {

    const date = new Date();
    date.setDate(date.getDate() + addDays);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
  }

}
