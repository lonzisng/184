var aboutLogin=[];
displayUser();
function displayUser() {
    $("").html("");
    for (var i=0;i<aboutLogin.length;i++){
        $("#img").append(`<tr>
                          
                            <td>${aboutLogin[i].banner}</td>
                        </tr>`)
    }
}