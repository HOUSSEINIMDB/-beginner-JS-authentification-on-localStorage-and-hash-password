    //La fonction de hachage
    const HACHAGE = chaineCar =>
        chaineCar.split('').reduce((a, b) => {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
        }, 0);

function stockerCode(event) {
    event.preventDefault();
    let code = document.getElementById("le_pass").value;
    if (code == "") {
        document.getElementById("avertir").innerHTML = "Code obligatoire";    
    }

    //taille minimale 
    else if (code.length < 3) {
        document.getElementById("avertir").innerHTML = "Le code doit avoir une taille de 3 caracteres minimum";
        return ;
    }

    //taille maximale 
    else if (code.length > 20) {
        document.getElementById("avertir").innerHTML = "Le code doit avoir une taille de 20 caracteres maximum";
        return ;
    }
    //on fait le localStorage et le hachage    
    
    else{
    let login = document.getElementById("le_login").value;
    
    const user={
        username:login,
        code: HACHAGE(code),
    };
    console.log(code);
    localStorage.setItem(user.username,JSON.stringify(user));
    }
}

function connecter(event){
    event.preventDefault();
    let code = document.getElementById("le_pass").value;
    let login = document.getElementById("le_login").value;
    //recuperation de l'utilisateur a partir du Local Storage
    var user=localStorage.getItem(login);
    var data=JSON.parse(user);
    code = HACHAGE(code);
    if(data){
        if(login==data.username&& code==data.code){
            document.getElementById("avertir").innerHTML ="Connection réussie";
            console.log(user);
        }
        else{
            document.getElementById("avertir").innerHTML ="Login ou code incorrect";
        }
    }
    else document.getElementById("avertir").innerHTML ="Vous n'êtes pas inscrit";
    
}