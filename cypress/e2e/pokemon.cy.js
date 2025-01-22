describe('Покупка нового аватара', function () {

    it('Тест на покупку аватара', function () {
        cy.visit('https://pokemonbattle-stage.ru/'); // зайти на сайт
        cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN'); // найти поле почта и ввести почту
        cy.get('#password').type('USER_PASSWORD'); // найти поле пароль и ввести пароль
        cy.get('.auth__button').click(); // нажать кнопку войти
        cy.wait(2000);
        cy.get('.header__container > .header__id').click(); // найти кнопку войти на страницу тренера и нажать
        cy.get('[href="/shop"]').click(); // найти кнопку смена аватара и нажать
        cy.get('.available > .shop__button').first().click(); // находим первого доступного аватара и нажимаем кнопку купить
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('24444444444444'); // находим поле для ввода номера карты и вводим номер
        cy.get(':nth-child(1) > .pay_base-input-v2').type('1228'); // находим поле для ввода даты и вводим дату
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // находим поле для ввода CVV и вводим 125
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('Sviatoslav'); // находим поле для ввода имени и вводим имя
        cy.get('.pay-btn').click(); // найти кнопку оплатить и нажать ее
        cy.wait(2000);
        cy.get('#cardnumber').type('56456'); // найти поле "код из СМС" и ввести код
        cy.get('.payment__submit-button').click(); // найти кнопку отправить и нажать ее
        cy.get('.payment__padding').contains('Покупка прошла успешно'); // найти поле подтверждения успешной покупки и проверить текст

        
    })


})