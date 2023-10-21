//const { expect, browser, $ } = require('@wdio/globals')

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`https://demowebshop.tricentis.com/login`)

        await $('#email').setValue('g.gulov@gmail.com')
        await $('#password').setValue('12345678!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveTextContaining(
            'You logged into a secure area!')
    });
});

