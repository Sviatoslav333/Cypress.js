

import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // зайти на сайт
           });

    afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); // найти крестик и что он виден пользователю
           });

    it('Верный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login); // найти поле логин и ввести логин
        cy.get(main_page.password).type(data.password); // найти поле пароль и ввести пароль
        cy.get(main_page.login_button).click(); // нажать кнопку войти

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // найти поле успешной авторизации и проверить текст в этом поле
        cy.get(result_page.title).should('be.visible'); // найти поле успешной авторизации и проверить что он виден пользователю
           })

    it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // найти поле Забыли пароль и проверить его цвет
        cy.get(main_page.fogot_pass_btn).click(); // найти поле Забыли пароль и нажать кнопку Забыли пароль

        cy.get(recovery_password_page.email).type(data.login); // найти поле Восстановите пароль и ввести почту
        cy.get(recovery_password_page.send_button).click(); // нажать кнопку Отправить код

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // найти поле успешной отправки почты и проверить текст
        cy.get(result_page.title).should('be.visible'); // найти поле успешной отправки почты и проверить что он виден пользователю
            })

    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // найти поле логин и ввести логин
        cy.get(main_page.password).type('iLoveqastudio'); // найти поле пароль и ввести неверный пароль
        cy.get(main_page.login_button).click(); // нажать кнопку войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // найти поле ошибки авторизации и проверить текст в этом поле
        cy.get(result_page.title).should('be.visible'); // найти поле ошибки авторизации и проверить что он виден пользователю
            })
        
    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('oleg@dolnikov.ru'); // найти поле логин и ввести неверный логин
        cy.get(main_page.password).type(data.password); // найти поле пароль и ввести верный пароль
        cy.get(main_page.login_button).click(); // нажать кнопку войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // найти поле ошибки авторизации и проверить текст в этом поле
        cy.get(result_page.title).should('be.visible'); // найти поле ошибки авторизации и проверить что он виден пользователю
            })
        
    it('Негативный кейс валидации', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // найти поле логин и ввести логин без @
        cy.get(main_page.password).type(data.password); // найти поле пароль и ввести верный пароль
        cy.get(main_page.login_button).click(); // нажать кнопку войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // найти поле ошибки авторизации и проверить текст в этом поле
        cy.get(result_page.title).should('be.visible'); // найти поле ошибки авторизации и проверить что он виден пользователю
            })

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMandolnikov.ru'); // найти поле логин и ввести логин c верхним регистром
        cy.get(main_page.password).type(data.password); // найти поле пароль и ввести верный пароль
        cy.get(main_page.login_button).click(); // нажать кнопку войти

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // найти поле ошибки авторизации и проверить текст в этом поле
        cy.get(result_page.title).should('be.visible'); // найти поле ошибки авторизации и проверить что он виден пользователю
             })
})