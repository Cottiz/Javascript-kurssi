// Exercise 1
        // Tietojen tallentaminen localstorageen
        function getData() {
            const destination = document.getElementById('destination').value;
            const arrival = document.getElementById('arrival').value;
            const services = [];
            const checkboxes = document.querySelectorAll('#services input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    services.push(checkbox.value);
                }
            });
           
            const entry = { destination: destination, arrival: arrival, services: services };
            localStorage.setItem('entry', JSON.stringify(entry));
            alert('Data saved to localstorage');
        }
        
        // Exercise 2
        // Tietojen lataaminen localstoragesta ja näyttäminen sivulla sessiondata-divissä
        function loadData () {
            const entry = JSON.parse(localStorage.getItem('entry'));
            if (entry) {
                const sessionData = document.getElementById('sessiondata');
                sessionData.innerHTML = `Destination: ${entry.destination}<br>Arrival: ${entry.arrival}<br>Services: ${entry.services.join(', ')}`;
            }
        }
        
        // Exercise 3
        // Localstorage vs. sessionstorage erot. 
        //Localstoragessa tieto säilyy selaimen sulkemisen jälkeen, 
        //kun taas sessionstorage ei säilytä tietoja kuin vain sen selainikkunan auki ollessa.

        // Tietojen tallentaminen sessionstorageen
        function saveSessionData() {
            const destination = document.getElementById('destinationSession').value;
            const arrival = document.getElementById('arrivalSession').value;
            const services = [];
            const checkboxes = document.querySelectorAll('#serviceSession input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    services.push(checkbox.value);
                }
            });

            const entry = { destination: destination, arrival: arrival, services: services };
            sessionStorage.setItem('entry', JSON.stringify(entry));
            alert('Data saved to sessionstorage');
        }

        // Tietojen lataaminen sessionstoragesta
        function loadSessionData() {
            const entry = JSON.parse(sessionStorage.getItem('entry'));
            if (entry) {
                const sessionData = document.getElementById('sessiondata');
                sessionData.innerHTML = `Destination: ${entry.destination}<br>Arrival: ${entry.arrival}<br>Services: ${entry.services.join(', ')}`;
            } else {
                const sessionData = document.getElementById('sessiondata');
                sessionData.innerHTML = 'No session data available';
            }           
        }

        // Exercise 4: Pakkauslista
        // Tässä tehtävässä on toteutettu yksinkertainen pakkauslistan tallennus localstorageen 

       

        // Lisätään uusi tavara pakkauslistalle

        function addPackingItem() {
            const itemInput = document.getElementById('itemInput')
            const item = itemInput.value.trim();
            if (item) {
                // Haetaan localstoragesta pakkauslistan tiedot
                let items = JSON.parse(localStorage.getItem('packingItems')) || [];

                //Lisätään uusi tavara listaan
                items.push(item);

                //Tallennetaan päivitetty lista localstorageen
                localStorage.setItem('packingItems', JSON.stringify(items));

                //Tyhjennetään syöttökenttä ja näytetään päivitetty lista
                itemInput.value = '';
                displayPackingItems();
            }
        }

        // Näytetään pakkauslistan Localstorage
        function displayPackingItems() {
            const items = JSON.parse(localStorage.getItem('packingItems')) || [];
            const itemList = document.getElementById('itemList');
            itemList.innerHTML = '';

            //Luodaan lista pakkauslistan tavaroista
            items.forEach((item, index) => {
                const li = document.createElement('li');

                //Lisätään checkbox, jolla voidaan valita poistettavat tavarat
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = index;
                li.appendChild(checkbox);

                //Lisätään teksti ja lisätään se listaan
                li.appendChild(document.createTextNode(item));
                itemList.appendChild(li);
            });
        }

        // Poistetaan valitut tavarat pakkauslistasta
        function deleteSelectedItems() {
            let items = JSON.parse(localStorage.getItem('packingItems')) || [];
            const checkboxes = document.querySelectorAll('#itemList input[type="checkbox"]:checked');
            
            //Haetaan valittujen tavaroiden indeksit ja poistetaan ne listasta
            const indicesToDelete = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));
            
            //Poistetaan valitut tavarat listasta
            items = items.filter((item, index) => !indicesToDelete.includes(index));
            
            //Päivitetään lista localstorageen ja näytetään päivitetty lista
            localStorage.setItem('packingItems', JSON.stringify(items));
            displayPackingItems();
        }

         // Ladataan pakkauslistan tiedot sivun latauksen yhteydessä
         window.onload = () => {
            displayPackingItems();
        }
