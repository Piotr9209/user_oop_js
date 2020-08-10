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
import {
    v4 as uuidv4
} from 'uuid';


class Validation {
    static isEmail(email) {
        if (!is.email(email)) throw new Error(`is wrong email`);
    }

    static isPassword(password) {
        is.setRegexp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'alphaNumeric');
        if (!is.alphaNumeric(password)) throw new Error('is wrong password');
    }

    static isSex(sex) {
        if (!is.inArray(sex, ["male", "female"])) throw new Error(`is wrong sex`);
    }

    static isEntryLevel(entryLevel) {
        if (!is.inArray(entryLevel, ["user", "admin"])) throw new Error(`is wrong type user`);
    }

    static isEmpty(value) {
        if (is.empty(value)) throw new Error(`name and surname must be the min 1 characters`);
    }

    static isUser(value) {
        return value instanceof User;
    }
}

class User {
    constructor(name, surname, email, password, dateOfBirth, sex, entryLevel = 'user') {
        Validation.isEmpty(name);
        Validation.isEmpty(surname);
        Validation.isPassword(password);
        Validation.isEmail(email);
        Validation.isSex(sex);
        Validation.isEntryLevel(entryLevel);

        this.uuid = uuidv4();
        this.dateRegistration = moment().format("DD/MM/YYYY");
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = moment(dateOfBirth, ['MM.DD.YYYY', 'DD.MM.YYYY', 'YYYY.MM.DD', 'YYYY.DD.MM']).format('DD/MM/YYYY');
        this.password = password;
        this.sex = sex;
        this.email = email;
        this.entryLevel = entryLevel;
    }

    updateEmail(email) {
        Validation.isEmail(email);
        this.email = email;
    }
}

class Admin extends User {
    constructor(name, surname, email, password, dateOfBirth, sex, entryLevel = 'admin') {
        super(name, surname, email, password, dateOfBirth, sex, entryLevel = 'admin');
    }

    changePasswordUser(user, password) {
        Validation.isUser(user);
        Validation.isPassword(password);
        user.password = password;
    }

    // changeUserEntryLevel(user, name, surname, email, password, dateOfBirth, sex, entryLevel = 'admin') {
    //     Validation.isUser(user);
    //     Validation.isEmpty(name);
    //     Validation.isEmpty(surname);
    //     Validation.isPassword(password);
    //     Validation.isEmail(email);
    //     Validation.isSex(sex);
    //     Validation.isEntryLevel(entryLevel);

    //     return (
    //         user.uuid = user.uuid,
    //         user.name = name,
    //         user.surname = surname,
    //         user.email = email,
    //         user.password = password,
    //         user.dateOfBirth = moment(dateOfBirth, ['MM.DD.YYYY', 'DD.MM.YYYY', 'YYYY.MM.DD', 'YYYY.DD.MM']).format('DD/MM/YYYY'),
    //         user.sex = sex,
    //         user.entryLevel = entryLevel
    //     )
    // }

    changeEntryLevel(user) {
        return (
            user.uuid = this.uuid,
            user.name = this.name,
            user.surname = this.surname,
            user.email = this.email,
            user.dateOfBirth = this.dateOfBirth,
            user.password = this.password, user.sex = this.sex,
            user.entryLevel = 'admin'
        )

    }
}

// nie
// 2:06
// zmiana danych powinna operować na clasie User
// 2:07
// a nie na tym co wpada do kontrutkroa
// 2:07
// to nie jest poprawnie zrobione

// Piotr  2:07 PM
// ok

// Piotr  2:22 PM
// ale ok, bo nie wiem czy ja to dobrze rozumuję. do metody muszę przekazać class User i na niej operować, ale żeby zmienić jej dane to potrzebuje wywoływać je jako argumenty ?

// Przemek:bulb:  2:22 PM
// do metody musisz przekazać w argumencie instancję user
// 2:23
// a ma wyjść instancja admin

const user = new User(
    "piotr",
    "gdula",
    "piotr@gmail.com",
    "Qwer12342?!",
    "20.03.1990",
    'male'
);

const user2 = new User(
    "piotr",
    "gdula",
    "piotr@gmail.com",
    "Qwer12342?!",
    "20.03.1990",
    'male'
);

const admin = new Admin(
    "jan",
    "kowalski",
    "jan@gmail.com",
    "Qwer1234?!",
    "19.02.1988",
    "female",
);


console.log(user);
console.log(user2);
console.log(admin);

const adminFromUser = admin.changeEntryLevel(user2);
console.log(adminFromUser);
console.log(adminFromUser instanceof Admin);