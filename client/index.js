const SERVER = 'http://localhost:3000'

$(document).ready(()=>{
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        showNewsAndWeather(accessToken)
        $("#login").hide()
        $("#home").show()
        $("#newss").show()
        $("#weatherr").show()
    }else{
        $("#newss").hide()
        $("#weatherr").hide()
        $("#home").hide()
        $("#login").show()
    }
})

$('#register').hide()
$("#registertog").on("click", function(){
    let tog = false
    tog = !tog
    if(tog){
        $('#register').show()
        $('#login').hide()
        $("#home").hide()
    }
})

$("#backtog").on("click", function(){
    let tog = false
    tog = !tog
    if(tog){
        $('#register').hide()
        $('#login').show()
        $("#home").hide()
    }
})



function login(ev){
    ev.preventDefault()
    console.log("login");
    const email = $("#login-email").val()
    const password = $("#login-password").val()
    console.log(email, password);
    $.ajax({
        method: "POST",
        url: SERVER + "/login",
        data: { email,password }
      })
      .done(res=>{
        localStorage.setItem('accessToken', res.accessToken);
        // console.log(res.accessToken)
        showNewsAndWeather(res.accessToken)
        $("#login").hide()
        $("#home").show()
        $("#newss").show()
        $("#weatherr").show()
      })
      .fail(err=>{
        fetchErrorLogin(err.responseJSON.msg)
    })
}

function register(ev){
    ev.preventDefault()
    const email = $("#register-email").val()
    const password = $("#register-password").val()
    const full_name = $("#register-full_name").val()
    console.log('hoihoi');
    $.ajax({
        method: "POST",
        url: SERVER + "/register",
        data: { full_name,email,password }
      })
      .done(res=>{
        $("#login").show()
        $("#home").hide()
        $('#register').hide()
      })
      .fail(err=>{
        fetchErrorRegister(err.responseJSON.msg)
    })
}

function convert(number){
    let hari;
    switch(number){
        case 0: 
            hari = "Sun"
        break;
        case 1: 
            hari = "Mon"
        break;
        case 2: 
            hari = "Tue"
        break;
        case 3: 
            hari = "Wed"
        break;
        case 4: 
            hari = "Thu"
        break;
        case 5: 
            hari = "Fri"
        break;
        case 6: 
            hari = "Sat"
        break;
    }
    return hari
}

function showNewsAndWeather(accessToken){
    $.ajax({
        method: "GET",
        url: SERVER + "/news",
        headers: { 
            accessToken
         }
      })
      .done(res=>{
            $('#cuaca').empty()
            $('#cuaca').append(
            `
            <div class="col-md-2 offset-md-3">
            <h4 style="margin-top: 35px;">${res.cuaca.timezone}</h4>
            </div>
            <div class="col-md-2">
            <img src="https://openweathermap.org/img/wn/${res.cuaca.current.weather[0].icon}@2x.png" >
            </div>
            <div class="col-md-2">
            <h4 style="margin-top: 35px;">${Math.round(+res.cuaca.current.temp-273)}<sup>
            o</sup>C</h4>
            </div>
            `
            )
            $('#cuaca2').empty()
            for(let i = 1; i < res.cuaca.daily.length; i++){
            let date = new Date(res.cuaca.daily[i].dt * 1000).getDay()
            let tanggal = convert(date)
            console.log(date)
            console.log(res.cuaca.daily[i].dt)
            console.log(convert(date))
            console.log(res.cuaca.daily[i].weather[0].icon)
            console.log(Math.round(+res.cuaca.daily[i].temp.max-273))
            $('#cuaca2').append(
                `
                <div class="col-md-2">
                <h5>${tanggal}</h5>
                <img src="https://openweathermap.org/img/wn/${res.cuaca.daily[i].weather[0].icon}@2x.png">
                <h6 style="color: red">${Math.round(+res.cuaca.daily[i].temp.max-273)}<sup>
                o</sup>C</h6>
                <h6 style="color: blue">${Math.round(+res.cuaca.daily[i].temp.min-273)}<sup>
                o</sup>C</h6>
                </div>
                `
                )
            }

            //   console.log(res)
            $('#berita').empty()
            res.berita.forEach(e=>{
                    let date = e.publish_date.split("T")[0]
                    // console.log(e)
                    $('#berita').append(
                    `
                        <div class="col-md-4">
                        <img src="${e.imageURL}" class="card-img" >
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${e.title}</h5>
                        <p class="card-text">${e.text}</p>
                        <p class="card-text"><small class="text-muted">Published Date: ${date}</small></p>
                        </div>
                        </div>
                    `
                    )
                })
      })
      .fail(err=>{
        console.log(err)
    })
}
// Google Sign In
function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:"POST",
        url : SERVER + '/googlelogin',
        data : {google_token}
    })
    .done(response =>{
        console.log(response);
        localStorage.setItem('accessToken', response.accessToken);
        $("#login").hide()
        $("#home").show()
        $("#newss").show()
        $("#weatherr").show()
        showNewsAndWeather(response.accessToken)
    })
    .fail(err =>{
        fetchErrorLogin(err.responseJSON.msg)
    })

  }

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
    localStorage.removeItem('accessToken');
    $("#home").hide()
    $("#login").show()
}

//fetch Error Login
function fetchErrorLogin(text) {
    $("#error-login").empty()
    $("#error-login").append(text)
}

//fetch Error Register
function fetchErrorRegister(text) {
    $("#error-register").empty()
    $("#error-register").append(text)
}

// * Github Oauth

$('#github-oauth').on('click', e => {
    e.preventDefault()
    window.open('https://github.com/login/oauth/authorize?client_id=c479c6b7eaaad9a3ea00')
})