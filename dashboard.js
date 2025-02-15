let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let company = document.getElementById("company");
let address = document.getElementById("address");
let email = document.getElementById("email");

let addUserBtn = document.getElementById("add-user-btn");

let userTableBody = document.getElementById("user_table_body");


async function addUsers(){

    try{

        const { error } = await supabase
        .from("user") 
        .insert({
            first_name: firstName.value,
            Last_name: lastName.value,
            company: company.value,
            address: address.value,
            email: email.value,
        });

        if(error) throw error
       
        Swal.fire({
            title: "User Added",
            text: "User Sucesfully Added in the System",
            icon: "success",
          });

          userTableBody.innerHTML = "";

          getUsers();

    }catch (error) {
        console.log(error);
      }
}


async function getUsers(){
    try{
        const { data, error } = await supabase.from('user').select()
        
        if(error) throw error
        console.log(data)

        if(data){
            data.map((value)=>{
                return (userTableBody.innerHTML+= 

                    
                    `<tr>
                      <td scope="col">${value.first_name}</td>
                        <td scope="col">${value.Last_name}</td>
                        <td scope="col">${value.company}</td>
                        <td scope="col">${value.address}</td>
                        <td scope="col">${value.email}</td>
                    </tr>`
                )
            });
        }
 

    } catch(error){
        console.log(error)
    }
}

if (addUserBtn){
addUserBtn.addEventListener('click',addUsers);
}

