import { Selector } from 'testcafe';
import { getDevices, updateDevice, deleteDevice, createDevice} from './requests'


fixture `TestCafe Exercise`
    .page `http://192.168.1.89:3001/`;

// variables constants
const newName = 'omardevice'
const newType = 'MAC'			//device type to add
const newCapacity = '111'		
// SELECTORS - ADD/EDIT DEVICE
const inputName = Selector('input#system_name')
const selectType = Selector('select#type')
const inputCapacity = Selector('input#hdd_capacity')
const submitSaveDevice = Selector('button.submitButton')
// SELECTORS - LIST DEVICES
const listDevices = Selector('div.list-devices')
const deviceName = listDevices.find('span.device-name')
const deviceType = listDevices.find('span.device-type')
const deviceCapacity = listDevices.find('span.device-capacity')	
const submitAddDevice = Selector('a.submitButton')
const deviceOptions = text => deviceName.withText(text).parent(1).find('div.device-options') //search div whit class device-options
const optionType = selectType.find('option').withText(newType)

const randomString = (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

	test(`Test 1`, async (t) => {
			const devices = await getDevices() // Get Devices from API

			for (const device of devices) {
				const option = deviceOptions(device.system_name);
				const editButton = option.find('a.device-edit');
				const removeButton = option.find('button.device-remove');

				await t
					.expect(deviceName.withText(device.system_name).exists).ok() // Validate device name
					.expect(deviceType.withText(device.type).exists).ok() // Validate device type
					.expect(deviceCapacity.withText(device.hdd_capacity).exists).ok() // Validate davice capacity
					.expect(editButton.exists).ok() //Validate button exists
					.expect(removeButton.exists).ok(); //Validate button exists
			}
		});
	
	test(`Test 2`, async t => {
		const newName2 = randomString(5)
		await t
		    .click(submitAddDevice)
			.typeText(inputName, newName2)
			.click(selectType)
			.click(optionType)
			.typeText(inputCapacity, newCapacity)
			.click(submitSaveDevice)

			await t.eval(() => location.reload(true))
	
		const devices =	await getDevices()
		const newDevice = devices.find(device => device.system_name === newName2) // search for new device added
	
	await t
		.expect(deviceName.withText(newDevice.system_name).visible).ok() // Validate device name
		.expect(deviceType.withText(newDevice.type).visible).ok() // Validate device type
		.expect(deviceCapacity.withText(newDevice.hdd_capacity).visible).ok() // Validate davice capacity	
	});

	test.only('Test 3', async t => { 

		//Renames the first device of the list to “Renamed Device”.
		
		const newName2 = randomString(5)
		const payload = {
			system_name: newName2,
			type: "MAC",
			hdd_capacity: "666"
		}
		await updateDevice(t.ctx.device.id, payload)	//Update device through API
		await t.eval(() => location.reload(true))
		const devicesUpdated = await getDevices()
		const deviceUpdated = devicesUpdated.find(device => device.id === t.ctx.device.id)
	
		await t
			.expect(deviceUpdated.system_name).eql(newName2)	// Validate device name in data
			.expect(deviceName.withText(newName2).visible).ok() // Validate device name in UI
			
	}).before(async t => {  
		const newName1 = randomString(5)
		const payloadNewDevice = {
			system_name: newName1,
			type: "WINDOWS WORKSTATION",
			hdd_capacity: "777"
		}
		const newDevice = await createDevice(payloadNewDevice)
		t.ctx.device = newDevice
		
	}).after(async t => {  

		t.ctx.device.id && await deleteDevice(t.ctx.device.id)	//Delete device through API
		console.log(t.ctx.device.id)
	});



	test('Test 4', async t => {

		const newName1 = randomString(5)
		const payloadNewDevice = {
			system_name: newName1,
			type: "WINDOWS WORKSTATION",
			hdd_capacity: "777"
		}
		const newDevice = await createDevice(payloadNewDevice)
		await t.eval(() => location.reload(true))
		await t.expect(deviceName.withText(newName1).visible).ok()

		await deleteDevice(newDevice.id)	//Delete device through API
		await t.eval(() => location.reload(true))
		const devicesUpdated = await getDevices()
		const deviceUpdated = devicesUpdated.find(device => device.id === newDevice.id)

		await t
			.expect(deviceUpdated).notOk()	// Validate device name in data
			.expect(deviceName.withText(newName1).visible).notOk() // Validate device name in UI
	});
	