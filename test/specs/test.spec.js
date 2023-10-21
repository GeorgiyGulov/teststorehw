describe('My Login application', () => {
  it('should login with valid credentials', async () => {
      await browser.url(`https://demowebshop.tricentis.com/login`)

      await $('Input#Email.email').setValue('g.gulov@gmail.com')
      await $('Input#Password.password').setValue('12345678')
      await $('input.button-1.login-button').click();
 //     await browser.pause(2000);
      await expect($('a.account')).toHaveTextContaining(
          'g.gulov@gmail.com');
      await $('a.ico-logout').click();
  });
});

describe("Register New User", () => {

  it("Verify that allows register a User", async () => {
    const genRandomEmail = () => {
      const baseEmail = 'testuser'; 
      const randomNumber = Math.floor(Math.random() * 1000000); 
      const randomEmail = `${baseEmail}${randomNumber}@example.com`;
      return randomEmail;
    };
      
     await browser.url("https://demowebshop.tricentis.com/");
     // browser.maximizeWindow();
     await $("a[href='/register']").click();
     await $("input#gender-male").click();
     await $("input[name='FirstName']").setValue("Ronald");
     await $("input[name='LastName']").setValue("McDonald");
     const randomEmail = genRandomEmail();
     await $('input#Email.text-box.single-line').setValue(randomEmail);
//     await browser.pause(5000);
     await $("input[name='Password']").setValue("123Testh");
     await $("input[name='ConfirmPassword']").setValue("123Testh");
     await $(".buttons #register-button").click();

     const confirmation = await $("div.result");
     expect (await confirmation.getText()).toEqual("Your registration completed");
  });
});


describe("Number of items on the page", () => {
  it("Check the number of items on the page", async () => {
    await browser.url("https://demowebshop.tricentis.com/apparel-shoes");
    await $("select#products-pagesize").click();            
    const list = $("#products-pagesize");
    await list.click();

    const optionsize = "4";
    const option = $(`//select[@id='products-pagesize']//option[. = '${optionsize}']`);
    await option.click();

    await browser.waitUntil(() => {
    return $('.product-grid').isDisplayed;
    }, 
    {
      timeout: 10000, 
      timeoutMsg: 'Product grid did not load within 10 seconds'
    });

    const arrayOfItems = $$(".product-grid .item-box .product-item").lenght;
//await browser.pause(10000);
    expect(arrayOfItems).toBeElementsArrayOfSize('12'); //QUESTION TO MENTOR: if optionsize is 4, why assert array.length = 12 is passed?
  });
});

describe("Add item to cart", () => {
  it("Check the item is added to the cart", async () => {
    await browser.url(`https://demowebshop.tricentis.com/login`)

    await $('Input#Email.email').setValue('g.gulov@gmail.com')
    await $('Input#Password.password').setValue('12345678')
    await $('input.button-1.login-button').click();
//     await browser.pause(2000);
    await expect($('a.account')).toHaveTextContaining('g.gulov@gmail.com');
    
    await $('/html/body/div[4]/div[1]/div[2]/ul[1]/li[2]/a').click();
    await $('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div.page.category-page > div.page-body > div.sub-category-grid > div:nth-child(1) > div > h2 > a').click();
    var elementName = $('//*[@id="product-details-form"]/div/div[1]/div[2]/div[1]/h1/text()');
    await $('/html/body/div[4]/div[1]/div[4]/div[2]/div[2]/div[2]/div[3]/div[1]/div/div[2]/div[3]/div[2]/input').click();
    await $('//*[@id="add-to-cart-button-72"]').click();
    await $('//*[@id="topcartlink"]/a/span[1]').click();
  
    expect (elementName  = $('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div > div > div.page-body > div > form > table > tbody > tr > td.product > a'));
  })
});

// QUESTION TO MENTOR - How to make locators not so huge?

describe("Remove from cart", () => {
  it("Check remove from cart option", async () => {
    await browser.url(`https://demowebshop.tricentis.com/login`);
    await $('Input#Email.email').setValue('g.gulov@gmail.com');
    await $('Input#Password.password').setValue('12345678');
    await $('input.button-1.login-button').click();
    await $('//*[@id="topcartlink"]/a/span[1]').click();
    await $('/html/body/div[4]/div[1]/div[4]/div/div/div[2]/div/form/table/tbody/tr/td[5]/input').setValue('0');
    await browser.keys("\uE007");
    let message = $('/html/body/div[4]/div[1]/div[4]/div/div[2]/div[2]/div');
    await browser.pause(10000);
    expect (message = 'Your Shopping Cart is empty!');
    await browser.pause(10000);
  });
});

describe("Add item to Wishlist", () => {
  it("Check the item is added to the cart", async () => {
    await browser.url(`https://demowebshop.tricentis.com/login`);

    await $('Input#Email.email').setValue('g.gulov@gmail.com');
    await $('Input#Password.password').setValue('12345678');
    await $('input.button-1.login-button').click();
//     await browser.pause(2000);
    await expect($('a.account')).toHaveTextContaining('g.gulov@gmail.com');
    await browser.url('https://demowebshop.tricentis.com/apparel-shoes');
    
    await $('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div.page.category-page > div.page-body > div.product-grid > div:nth-child(1) > div > div.details > div.add-info > div.buttons > input').click();
    await $('//*[@id="add-to-wishlist-button-5"]').click();
    var elWishName = $('//*[@id="product-details-form"]/div/div[1]/div[2]/div[1]/h1');
    await $('/html/body/div[4]/div[1]/div[1]/div[2]/div[1]/ul/li[4]/a').click();
   // await $('//*[@id="add-to-cart-button-72"]').click();
   // await $('//*[@id="topcartlink"]/a/span[1]').click();
  
    expect (elWishName  = $('/html/body/div[4]/div[1]/div[4]/div/div/div[2]/div[1]/form/table/tbody/tr/td[4]/a'));
  })
});
