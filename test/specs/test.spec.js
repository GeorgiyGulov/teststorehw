describe('Test Store', () => {
  it('1. Should login with valid credentials', async () => {
    await browser.url(`https://demowebshop.tricentis.com/login`)

    await $('Input#Email.email').setValue('g.gulov@gmail.com')
    await $('Input#Password.password').setValue('12345678')
    await $('input.button-1.login-button').click();
    //     await browser.pause(2000);
    await expect($('a.account')).toHaveTextContaining(
      'g.gulov@gmail.com');
    await $('a.ico-logout').click();
  });


  it("2. Verify that allows register a User", async () => {
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
    expect(await confirmation.getText()).toEqual("Your registration completed");
  });

  it('3. Computers category', async () => {
    await $('.list a[href="/computers"]').click();   
    const subGroupList = await $('.list a[href="/computers"]~ul.sublist');
    const subGroupItems = await subGroupList.$$('li a');
    expect(subGroupItems.length).toBe(3);
  });

  it("Verify that allows sorting items (Price: High to Low)", async () => {
    await $(".top-menu [href='/computers']").click();
    await $(".page-body .title > a[href='/desktops']").click();
    const list = $("#products-orderby");
    await list.click();
    const optionText = "Price: High to Low";
    const option = $(`//select[@id='products-orderby']//option[. = '${optionText}']`);
    await option.click();
    await browser.waitUntil(() => {
    return $$('.product-grid .item-box .product-item:first-child').isDisplayed;
    });
    const productElements = await $(".product-grid");
    const productNames = await productElements.$$(".item-box .product-item .product-title").map(product => {
    return product.getText();
    });
    const productPrices = await productElements.$$(".item-box .product-item .prices .actual-price").map(async (product) => {
    const priceText = await product.getText();
    console.log(`Price Text: ${priceText}`);
    const priceValue = parseFloat(priceText);
    console.log(`Price Value: ${priceValue}`);
    return priceValue;
    });
    const isSorted = productPrices.every((price, index, array) => {
    if (index === 0) {
    return true; 
    };
    if (price === array[index - 1]) {
    const productName = productNames[index];
    const previousProductName = productNames[index - 1];
    return productName.localeCompare(previousProductName) >= 0;
    };
    return price <= array[index - 1];
    });
    productPrices.forEach((price, index) => {
    });
    expect(isSorted).toBe(true);
  });

  it('5. Verify that allows changing number of items on page', async () => {
    await browser.url("https://demowebshop.tricentis.com/apparel-shoes");
    await $("select#products-pagesize").click();
    const number = $("#products-pagesize");
    await number.click();
    const numberItems = "4";
    const numberPerPage = $(`//select[@id='products-pagesize']//option[. = '${numberItems}']`);
    await numberPerPage.click();
    await browser.waitUntil(() => {
    return $('.product-grid').isDisplayed;
    });
    const items = await $$('.product-grid .product-item');
    expect(items.length).toBe(4);
});

it('6. Check the item is added to the Wishlist', async () => {
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

  expect(elWishName = $('/html/body/div[4]/div[1]/div[4]/div/div/div[2]/div[1]/form/table/tbody/tr/td[4]/a'));
});

it('7. Check the item is added to the cart', async () => {
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

  expect(elementName = $('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div > div > div.page-body > div > form > table > tbody > tr > td.product > a'));
});


it('8. Check remove from cart option', async () => {
  await browser.url(`https://demowebshop.tricentis.com/login`);
  await $('Input#Email.email').setValue('g.gulov@gmail.com');
  await $('Input#Password.password').setValue('12345678');
  await $('input.button-1.login-button').click();
  await $('//*[@id="topcartlink"]/a/span[1]').click();
  await $('/html/body/div[4]/div[1]/div[4]/div/div/div[2]/div/form/table/tbody/tr/td[5]/input').setValue('0');
  await browser.keys("\uE007");
  let message = $('/html/body/div[4]/div[1]/div[4]/div/div[2]/div[2]/div');
  await browser.pause(100);
  expect(message = 'Your Shopping Cart is empty!');
  await browser.pause(100);
});



it('9. Check the checkout procedure', async () => {
  await browser.url(`https://demowebshop.tricentis.com/login`);
  await $('Input#Email.email').setValue('g.gulov@gmail.com');
  await $('Input#Password.password').setValue('12345678');
  await $('input.button-1.login-button').click();
  await browser.url('https://demowebshop.tricentis.com/apparel-shoes');
  await $('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div.page.category-page > div.page-body > div.product-grid > div:nth-child(1) > div > div.details > div.add-info > div.buttons > input').click();
  await $('//*[@id="add-to-cart-button-5"]').click();
  await $('//*[@id="topcartlink"]/a').click();
  await $('//*[@id="termsofservice"]').click();
  await $('//*[@id="checkout"]').click();
  await $('//*[@id="billing-buttons-container"]/input').click();
  await browser.pause(1000);
  await $('#shipping-buttons-container > input').click();
  await browser.pause(1000);
  await $('//*[@id="shipping-method-buttons-container"]/input').click();
  await browser.pause(1000);
  await $('//*[@id="payment-method-buttons-container"]/input').click();
  await browser.pause(1000);
  await $('//*[@id="payment-info-buttons-container"]/input').click();
  await browser.pause(1000);
  await $('//*[@id="confirm-order-buttons-container"]/input').click();
  var title = $('/html/body/div[4]/div[1]/div[4]/div/div/div[2]/div/div[1]');
  expect(title = "Your order has been successfully processed!");
});
});