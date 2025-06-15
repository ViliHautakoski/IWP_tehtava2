if(document.readyState !== "loading") {
    console.log("Document is ready!");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("Document is ready after waiting!");
        initializeCode();
    })
}

function initializeCode() {
    const addDataButton = document.getElementById("submit-data")
    const removeDataButton = document.getElementById("empty-table")
    const userMap = new Map() 
    const tablebody = document.getElementById("table-body")
    const checkbox = document.getElementById("input-admin")
    const userImage = document.getElementById("input-image")


    addDataButton.addEventListener("click", function(){
        const userImageFile = userImage.files[0]
        let imageURL = ""
        if(userImageFile){
            imageURL = URL.createObjectURL(userImageFile)
        }
        let data = {
            username: document.getElementById("input-username").value,
            email: document.getElementById("input-email").value,
            admin: checkbox.checked ? "X" : "-",
            image: imageURL
        }

            if(userMap.has(data.username)){
                const user = userMap.get(data.username)
                user.email = data.email
                user.admin = data.admin
                user.image = data.image
                userMap.set(data.username,user)

                const rows = tablebody.querySelectorAll("tr")
                

                rows.forEach(element => {
                    const usernamecell = element.cells[0]
                    const emailcell = element.cells[1]
                    const admincell = element.cells[2]
                    const imagecell = element.cells[3]

                    if(usernamecell.textContent === data.username){
                        emailcell.textContent = data.email
                        admincell.textContent = data.admin

                        const img = imagecell.querySelector("img")
                        if(img){
                            img.src = data.image
                        }

                    }

                });
                
            }
            
            else{
            userMap.set(data.username, data)
            const usernamecell = document.createElement("td")
            usernamecell.textContent = data.username
            const emailcell = document.createElement("td")
            emailcell.textContent = data.email
            const admincell = document.createElement("td")
            admincell.textContent = data.admin

            const imgcell = document.createElement("td")
            const img = document.createElement("img")
            img.src = data.image
            img.style.width = "64px"
            img.style.height = "64px"
            imgcell.appendChild(img)
            
            
            const newTableRow = document.createElement("tr")

            newTableRow.appendChild(usernamecell)
            newTableRow.appendChild(emailcell)
            newTableRow.appendChild(admincell)
            newTableRow.appendChild(imgcell)

            tablebody.appendChild(newTableRow)
            }

    })
     removeDataButton.addEventListener("click", function(){
        const tablebody = document.getElementById("table-body")
        while(tablebody.lastChild){
            tablebody.removeChild(tablebody.lastChild)
        }
        userMap.clear()


    })
    
}