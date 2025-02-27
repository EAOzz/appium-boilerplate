import TabBar from '../screenobjects/components/TabBar';
import LoginScreen from '../screenobjects/LoginScreen';
import NativeAlert from '../screenobjects/components/NativeAlert';

describe('WebdriverIO and Appium, when positiv interacting with a login form,', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openLogin();
        await LoginScreen.waitForIsShown(true);
    });

    it('should be able login successfully', async () => {
        // Always make sure you are on the right tab
        await LoginScreen.tapOnLoginContainerButton();
        // Submit the data
        await LoginScreen.submitLoginForm({ username: 'test@webdriver.io', password: 'Test1234!' });
        // Wait for the alert and validate it
        await NativeAlert.waitForIsShown();
        await expect(await NativeAlert.text()).toEqual('Success\nYou are logged in!');

        // Close the alert
        await NativeAlert.topOnButtonWithText('OK');
        await NativeAlert.waitForIsShown(false);
    });

    
    it('should be able sign up successfully', async () => {
        // Always make sure you are on the right tab
        await LoginScreen.tapOnSignUpContainerButton();
        // Submit the data
        await LoginScreen.submitSignUpForm({ username: 'test@webdriver.io', password1: 'Test1234!', password2: 'Test1234!' });
        // Wait for the alert and validate it
        await NativeAlert.waitForIsShown();
        await expect(await NativeAlert.text()).toEqual('Signed Up!\nYou successfully signed up!');

        // Close the alert
        await NativeAlert.topOnButtonWithText('OK');
        await NativeAlert.waitForIsShown(false);
    });

});

describe('WebdriverIO and Appium, when negativ interacting with a login form,', () => {
    beforeEach(async () => {
        // NativeAlert.topOnButtonWithText('OK');
        await TabBar.waitForTabBarShown();
        await TabBar.openLogin();
        await LoginScreen.waitForIsShown(true);
    });

    it('should not be able login unsuccessful', async () => {
        // Always make sure you are on the right tab
        await LoginScreen.tapOnLoginContainerButton();
        // Submit the data
        await LoginScreen.submitLoginForm({ username: 'test@webdriver.io', password: 'Test12345!' });
        // Wait for the alert and validate it
        await NativeAlert.waitForIsShown();
        expect(await NativeAlert.text()).toEqual('Unsuccess\nYou are not logged in!');

        // Close the alert
        // await NativeAlert.topOnButtonWithText('OK');
        // await NativeAlert.waitForIsShown(false);
    });

        it('should not be able sign up unsuccessfully', async () => {
        // Always make sure you are on the right tab
        await LoginScreen.tapOnSignUpContainerButton();
        // Submit the data
        await LoginScreen.submitSignUpForm({ username: 'test@webdriver.io', password1: 'Test1234!', password2: 'Test12345!' });
        // Wait for the alert and validate it
        await NativeAlert.waitForIsWarning();
        await expect(await NativeAlert.textWarning()).toEqual('Please enter the same password');
        // await NativeAlert.waitForIsShown(false);
    });

    afterEach(async () => {
        NativeAlert.topOnButtonWithText('OK');
        await NativeAlert.waitForIsShown(false);
        
    });

   

});
