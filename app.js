// async function checkSession() {
//     try {
//       const { data, error } = await supabase.auth.getSession();
//       const authPages = ["/index.html", "/login.html", "/"];
//       const currentPath = window.location.pathname;
//       console.log(currentPath)
//       const isAuthPage = authPages.some((page) => page.includes(currentPath));
  
//       const { session } = data;   
  
//       // it will first check the session , if it's true then it will check Auth Page
//       if(session) {
//           if(isAuthPage) {
//               window.location.href = '/dashboard.html'
//           }
//       } else {
//           if(!isAuthPage) {
//               window.location.href = '/login.html'
//           }
//       }
  
//       console.log(session);
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   window.onload = checkSession;



async function USERDETAILS() {
        
    try {
        console.log("getUserr ...");
    const {
        data: { user,session },
    } = await supabase.auth.getUser();
    if (user) {
        console.log(user);

        try {
        const { data, error } = await supabase
            .from("users")
            .select("name, email , userId")
            .eq("userId", user.id);
        if (data) {
            console.log(data);

            let currentUser = {
            name:data[0].name,
            email: data[0].email,
            userId: data[0].userId,
            }

            console.log(currentUser.name)
            console.log(currentUser.email)
            console.log(currentUser.userId)
            

            localStorage.setItem('currentUser' , JSON.stringify(currentUser))
        }
        }
        catch (error) {
    console.log(error);
            Swal.fire({
                text: error.message,
                icon: "error"
            });
        }
    }
    } catch (error) {
    console.log(error);
    Swal.fire({
        text: error.message,
        icon: "error"
    });
    }
}

window.onload = USERDETAILS;

