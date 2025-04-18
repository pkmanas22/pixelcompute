

const form = document.getElementById('form')
const dialog = document.getElementById('alertDialog');
const closeButton = document.getElementById('closeDialogBtn');

closeButton.addEventListener('click', () => {
    dialog.close();
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value
    const date = document.getElementById('date').value
    const startTime = document.getElementById('startTime').value
    const endTime = document.getElementById('endTime').value
    const description = document.getElementById("description").value
    const eventLoc = document.getElementById('location').value

    if (!name || !date || !startTime || !endTime || !description || !eventLocation) {
        dialog.showModal()
        return;
    }
    console.log(name, date, startTime, endTime, description, eventLoc)

    document.getElementsByClassName('container')[0].style.display = "none"
    document.getElementsByClassName('event')[0].style.display = "block"

    document.getElementById('eventTitle').innerText = name;
    document.getElementById('eventDate').innerText = new Date("10-05-2026").toDateString();
    document.getElementById('eventTime').innerText = `${startTime} - ${endTime}`;
    document.getElementById('eventLocation').innerText = eventLoc;
    document.getElementById('eventDesc').innerText = description;
})