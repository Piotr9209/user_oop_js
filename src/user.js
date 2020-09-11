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

    changeEntryLevel(user) {
        let newAdminUser = new Admin(user.name, user.surname, user.email, user.password, user.dateOfBirth, user.sex, 'admin');
        newAdminUser.uuid = user.uuid;
        return newAdminUser;
    }
}

class Users {
    constructor(...usersObjs) {
        this.arrayWithUsers = [];
        usersObjs.forEach(element => {
            if (Validation.isUser(element)) {
                this.arrayWithUsers.push(element);
            }
        })
    }

    addUsersToArray(...usersObj) {
        usersObj.forEach(element => {
            if (!Validation.isUser(element)) return false;
        })
        this.arrayWithUsers.push(...usersObj);
    }

    deleteUserFromArray(userObj) {
        this.arrayWithUsers = this.arrayWithUsers.filter(element => element.uuid !== userObj.uuid);
    }
}


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

const users = new Users(user, user2, admin, adminFromUser);
console.log(users);