import { Selector } from 'testcafe';

fixture `New Fixture`
    .page `http://192.168.1.89:3001/`;

    test(`Test 1`, async t => {
		await t
			.click('#device_type')
			.click(Selector('#device_type option').withText('ALL'))
			Selector('#root span').withText('DESKTOP-SMART')
			Selector('#root span').withText('WINDOWS_WORKSTATION')
			Selector('#root span').withText('10 GB')
			Selector('#root span').withText('SERVER-ONE')
			Selector('#root span').withText('WINDOWS_SERVER')
			Selector('#root span').withText('50 GB')
			Selector('#root span').withText('FIRST-MAC')
			Selector('#root span').withText('MAC').nth(1)
			Selector('#root span').withText('180 GB')
			Selector('#root span').withText('ARMANDO-SERVER')
			Selector('#root span').withText('WINDOWS_SERVER').nth(1)
			Selector('#root span').withText('256 GB')
			Selector('#root span').withText('MOON-SMART')
			Selector('#root span').withText('WINDOWS_SERVER').nth(2)
			Selector('#root span').withText('256 GB').nth(1)
			Selector('#root span').withText('MIGUEL-PC')
			Selector('#root span').withText('WINDOWS_WORKSTATION').nth(1)
			Selector('#root span').withText('500 GB')
			Selector('#root span').withText('GOOD-MAC')
			Selector('#root span').withText('MAC').nth(3)
			Selector('#root span').withText('500 GB').nth(1)
			Selector('#root span').withText('JULIO-MAC-LOCAL')
			Selector('#root span').withText('MAC').nth(5)
			Selector('#root span').withText('512 GB')
			Selector('#root span').withText('GILBERT-COMPUTER')
			Selector('#root span').withText('WINDOWS_WORKSTATION').nth(2)
			Selector('#root span').withText('750 GB')
			Selector('#root span').withText('MAC-LEADER')
			Selector('#root span').withText('MAC').nth(7)
			Selector('#root span').withText('2048 GB')
			Selector('#root a').withText('EDIT')
			Selector('#root button').withText('REMOVE')
			Selector('#root a').withText('EDIT').nth(1)
			Selector('#root button').withText('REMOVE').nth(1)
			Selector('#root a').withText('EDIT').nth(2)
			Selector('#root button').withText('REMOVE').nth(2)
			Selector('#root a').withText('EDIT').nth(3)
			Selector('#root button').withText('REMOVE').nth(3)
			Selector('#root a').withText('EDIT').nth(4)
			Selector('#root button').withText('REMOVE').nth(4)
			Selector('#root a').withText('EDIT').nth(5)
			Selector('#root button').withText('REMOVE').nth(5)
			Selector('#root a').withText('EDIT').nth(6)
			Selector('#root button').withText('REMOVE').nth(6)
			Selector('#root a').withText('EDIT').nth(7)
			Selector('#root button').withText('REMOVE').nth(7)
			Selector('#root a').withText('EDIT').nth(8)
			Selector('#root button').withText('REMOVE').nth(8)
			Selector('#root a').withText('EDIT').nth(9)
			Selector('#root button').withText('REMOVE').nth(9)
	});

	test(`Test 2`, async t => {
		await t
			.click(Selector('a.submitButton').withText('ADD DEVICE'))    
			.click('#system_name')
			.pressKey('capslock')
			.typeText('#system_name', 'DEVICE_OMAR')
			.typeText('#hdd_capacity', '666')
			.click(Selector('button.submitButton').withText('SAVE'))
			.pressKey('capslock')
			Selector('#root span').withText('DEVICE_OMAR')
			Selector('#root span').withText('WINDOWS WORKSTATION').nth(1)
			Selector('#root span').withText('66 GB').nth(1)
			Selector('#root div').withText('DEVICE_OMAR').nth(4)
	});

	test(`Test 3`, async t => {

		await t
			.click(Selector('a.device-edit').withText('EDIT').nth(0))  
			await t     
			.click('#system_name')
			.selectText('#system_name', 15, 0)
			.pressKey('capslock')
			.typeText('#system_name', 'UPDATE DEVICE')
			.click(Selector('button.submitButton').withText('UPDATE'))
			.hover(Selector('div.device-main-box,device-name,span-device-name').withText('UPDATE DEVICE'))
	});
	


		test('Test 4', async t => {
			await t
				.click(Selector('button.device-remove').withText('REMOVE').nth(0))    
		}); 

		
			
		
		