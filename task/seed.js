const dbConnection = require("../config/mongoConnection");
var eventData = require('../com/rsvp/data/events')
var userData = require('../data/users')
async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    const cats = {
        music: 'music',
        foodndrinks: 'foodndrinks',
        artsnculture: 'artsnculture',
        sportsnwellness: 'sportsnwellness'
    }
    let event1 = { organizer: 'sergio', title: 'Ceramics Exhibition', category: cats.music, isPaid: false, cost: 0, sDate: 'April 15, 2020 9:05 AM',
      eDate: 'April 16, 2020 9:05 AM', desc: 'desf', capacity: 74, pricing: 'free', stAddr: 'Craft House, 500 Terry A Francois Blvd, Hoboken, NJ 07309, USA', state: 'NJ', country: 'US', imageUrl:'https://media.architecturaldigest.com/photos/5aff319a55eb56087f0434ac/master/pass/pottery-making.jpg'};
    let event2 = { organizer: 'berlin', title: 'Printing money at the royal mint', category: cats.foodndrinks, isPaid: true, cost: 10, sDate: 'April 15, 2020 9:05 AM',
      eDate: 'May 12, 2020 2:05 AM', desc: 'desf asdf', capacity: 10, pricing: 'paid', stAddr: '123 Jack St', state: 'NJ', country: 'US', imageUrl:"/images/sample_details_image.jpg"};
    let event3 = { organizer: 'denver', title: 'Stealing money from Bank of Spain', category: cats.artsnculture, isPaid: false, cost: 100, sDate: 'April 15, 2020 9:05 AM',
      eDate: 'June 1, 2020 3:05 PM', desc: 'lorem ipsum', capacity: 100, pricing: 'paid', stAddr: '123 Jack St', state: 'NJ', country: 'US', imageUrl:'https://www.w3schools.com/bootstrap4/img_avatar1.png'};
    let event4 = { organizer: 'salva', title: 'Plannig for the heist', category: cats.sportsnwellness, isPaid: false, cost: 0, sDate: 'April 15, 2020 9:05 AM',
      eDate: 'April 26, 2020 4:05 PM', desc: 'desf', capacity: 34, pricing: 'free', stAddr: '123 Jack St', state: 'NJ', country: 'US', imageUrl:'https://www.w3schools.com/bootstrap4/img_avatar1.png'};
    let event5 = { organizer: 'rio', title: 'Bogotta site training', category: cats.artsnculture, isPaid: true, cost: 30, sDate: 'April 15, 2020 9:05 AM',
      eDate: 'April 22, 2020 5:05 AM', desc: 'desf', capacity: 734, pricing: 'paid', stAddr: '123 Jack St', state: 'NJ', country: 'US', imageUrl:'https://www.w3schools.com/bootstrap4/img_avatar1.png'};
    let event6 = { organizer: 'sergio', title: 'Museum visit and planning', category: cats.sportsnwellness, isPaid: false, cost: 0, sDate: 'April 15, 2020 9:05 AM',
      eDate: 'April 21, 2020 6:05 PM', desc: 'desf', capacity: 746, pricing: 'free', stAddr: '123 Jack St', state: 'NJ', country: 'US', imageUrl:"https://www.w3schools.com/bootstrap4/img_avatar1.png"};
    let event7 = { organizer: 'sergio', title: 'Setup broadcast mechanism', category: cats.music, isPaid: false, cost: 0, sDate: 'April 15, 2020 9:05 AM',
      eDate: 'May 10, 2020 9:50 AM', desc: 'desf', capacity: 7, pricing: 'free', stAddr: '123 Jack St', state: 'NJ', country: 'US', imageUrl:"https://www.w3schools.com/bootstrap4/img_avatar1.png"};
    let event8 = { organizer: 'tokyo', title: 'Setup supply chain', category: cats.sportsnwellness, isPaid: true, cost: 20, sDate: 'April 15, 2020 9:05 AM',
      eDate: 'June 2, 2020 10:05 AM', desc: 'desf', capacity: 200, pricing: 'paid', stAddr: '123 Jack St', state: 'NJ', country: 'US', imageUrl:"https://www.w3schools.com/bootstrap4/img_avatar1.png"};
    let event9 = { organizer: 'sergio', title: 'Heist of the royal mint of Spain', category: cats.foodndrinks, isPaid: false, cost: 0, sDate: 'April 15, 2020 9:05 AM',
      eDate: 'June 3, 2020 9:05 AM', desc: 'desf', capacity: 30, pricing: 'free', stAddr: '123 Jack St', state: 'NJ', country: 'US', imageUrl:"https://www.w3schools.com/bootstrap4/img_avatar1.png"};
    let event10 = { organizer: 'salva', title: 'Heist of the royal mint of Spain', category: cats.music, isPaid: false, cost: 0, sDate: 'April 15, 2020 9:05 AM',
      eDate: 'May 6, 2020 11:05 PM', desc: 'desf', capacity: 24, pricing: 'free', stAddr: '123 Jack St', state: 'NJ', country: 'US', imageUrl:"https://www.w3schools.com/bootstrap4/img_avatar1.png"};
    
      eventData.createEvent(event1);
      eventData.createEvent(event2);
      eventData.createEvent(event3);
      eventData.createEvent(event4);
      eventData.createEvent(event5);
      eventData.createEvent(event6);
      eventData.createEvent(event7);
      eventData.createEvent(event8);
      eventData.createEvent(event9);
      eventData.createEvent(event10);
    
    await db.serverConfig.close();
}
main();