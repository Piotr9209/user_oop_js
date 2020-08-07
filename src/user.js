// 3) Stwórz strukturę danych związaną z użytkownikami.
// Obiekt charakteryzujący użytkownika:
// Ma mieć: Imię, Nazwisko, datę urodzenia, haslo, płeć, adres email, poziom dostepu = ""user""
// Ma umożliwiać: zmianę email

// Obiekt charakteryzujący administratora:
// Obiekt ten ma dziedziczyć po użytkowniku informacje z dodatkowymi możliwościami
// Ma Miec: poziom dostepu dla siebie = ""admin""
// Ma umożliwiać: zmieniać w obiekcie użytkownik poziom dostępu na admin", oraz modyfikować jego hasło.

// Dodatkowo User ma mieć walidacje wykonaną za pomocą is.js oraz datę obsługiwaną przez bibliotekę moment.js
// email ma być poprawnym emailem
// password ma mieć min 8 znaków, co najmniej jedną wielką literę i co najmniej jedną cyfrę oraz co najmniej 1 znak specjalny
// płeć musi być ze zbioru [male, female]
// data (nieważne jaka wejdzie) do propa musi wejść w formacie MM/DD/YYYY
// imię i nazwisko musi być niepuste, jeśli któraś z walidacji się nie powiedzie obiekt ma nie być tworzony, tylko ma zwracać error z odpowiednimi komunikatami o niepowiedzionej walidacji

import moment from "moment";
import is from "is_js";

class Validation {
    static isEmail(email) {
        if (!is.email(email)) throw new Error(`is wrong email`);
    }

    static isPassword(password) {
        is.setRegexp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'alphaNumeric');
        if (!is.alphaNumeric(password)) throw new Error('is wrong password');
    }
    //alphaNumeric powinen być zadeklarowany w construktorze w sensie is.setRegexp

    static isSex(sex) {
        if (!is.inArray(sex, ["male", "female"])) throw new Error(`is wrong sex`);
    }

    static isType(type) {
        if (!is.inArray(type, ["user", "admin"])) throw new Error(`is wrong type user`);
    }

    static isEmpty(value) {
        if (is.empty(value)) throw new Error(`name and surname must be the min 1 characters`);
    }

    static isUser(value) {
        return value instanceof User;
    }
}

class User {
    constructor(name, surname, dateOfBirth, password, sex, email, type) { //type=entryLevel, zmienić kolejność konstruktora
        Validation.isEmpty(name);
        Validation.isEmpty(surname);
        Validation.isPassword(password);
        Validation.isSex(sex);
        Validation.isEmail(email);
        Validation.isType(type);

        this.dateRegistration = moment().format("DD/MM/YYYY");
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = moment(dateOfBirth, ['MM.DD.YYYY', 'DD.MM.YYYY', 'YYYY.MM.DD', 'YYYY.DD.MM']).format('DD/MM/YYYY')
        this.password = password;
        this.sex = sex;
        this.email = email;
        this.type = type;
        this.entryLevel = 'user';
    }

    updateEmail(email) {
        Validation.isEmail(email);
        this.email = email;
    }
}

class Admin extends User {
    constructor(name, surname, dateOfBirth, password, sex, email, type = 'admin') {
        super(name, surname, dateOfBirth, password, sex, email, type); // zmienic na ...arguments
    }

    changePasswordUser(user, password) {
        Validation.isUser(user);
        Validation.isPassword(password);
        user.password = password;
    }
    changeTypeUser(user, type) {
        Validation.isUser(user);
        Validation.isType(type);
        user.type = type;
        //po zmianie user ma sie stac klasa admin - dodać mu metody
    }

}

const user = new User(
    "piotr",
    "gdula",
    "26.09.1992",
    "Qwer12342?!",
    "male",
    "piotr@gmail.com",
    'user'
);
const admin = new Admin(
    "jan",
    "kowalski",
    "26.09.1992",
    "Qwer1234?!",
    "female",
    "jan@gmail.com",
    'admin'
);
console.log(user);
console.log(admin);
admin.changePasswordUser(user, 'Jacek342342?!');
console.log(user);
console.log(admin);
admin.changeTypeUser(user, 'admin')
console.log(user);