

//logout
async function logout() {
    try {
        const response = await fetch('https://job-tracker-yvvt.onrender.com/logout');
        const data = await response.json();
        console.log(data);
        location.reload();

    } catch (error) {
        console.error('Error:', error);
    }
}

//login
async function login() {
    try {
        let url = 'https://job-tracker-yvvt.onrender.com/login';
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let data = {"email": email, "password": password};
        let response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            let error = await response.json();
            document.getElementById('display-error').innerHTML = error.msg;
            return;
        }

        let responseData = await response.json();
        console.log('Success:', responseData);

    } catch (error) {
        console.error('Error:', error);
    }
}



// Get all cookies
var allCookies = document.cookie;

// Function to get a specific cookie
function getCookie(name) {
    var cookieArr = allCookies.split(";");

    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if the cookie wasn't found
    return null;
}

// getting user ID from cookie
let myID = getCookie('id');
myID=myID.slice(3,myID.length-1)
console.log(myID)



// candidate profile statistics

// let user={
//     details:{
//         name:"Ramprasad",
//         applied:0,
//         processing:0,
//         rejected:0
//     },
//     jobs:[]
// }

let user;

fetch('https://job-tracker-yvvt.onrender.com/getuser')
    .then(response => response.json())
    .then(responseData => {
        user = responseData;
        showDetails()
        showJobs()
    })

function showDetails(){
    let candidateName=user.details.name
    let applied=user.details.Applied
    let processing=user.details.Processing
    let rejected=user.details.Rejected
    let total_applications=applied+processing+rejected
    document.querySelector('#candidate').innerHTML=`Candidate Name: ${candidateName}`
    document.querySelector('#applied').innerHTML=`Job Applied ${applied}`
    document.querySelector('#processing').innerHTML=`Under Procesing ${processing}`
    document.querySelector('#rejected').innerHTML=`Applications Rejected ${rejected}`
    document.querySelector('#totalApplications').innerHTML=`Total Jobs Applied ${total_applications}`
    document.querySelector('#display-welcome').innerHTML=`Welcome ${candidateName}`
}

function showJobs(){
    let jobs=user.jobs
    let total_applications = document.querySelector('#ApplicationsList')
    for(let i=0;i<jobs.length;i++){
        let div1=document.createElement('div');
        div1.setAttribute('class','company-name')
        div1.innerHTML=`<h2>${jobs[i].CompanyName}</h2>`
        for (let j=0;j<(jobs[i].applications.length);j++){
            let div2= document.createElement('div')
            let data =`<p>Role :${jobs[i].applications[j].Role}</p>
                       <p>Status :${jobs[i].applications[j].Status}</p>
                       <p>Applied Date :${jobs[i].applications[j].AppliedDate}</p>
                       <a href='${jobs[i].applications[j].JobLink}' target='_blank'>Job Link</a><hr>`
            div2.innerHTML=data
            div1.appendChild(div2)
            console.log(jobs[i].applications[j])
        }
        total_applications.appendChild(div1)
    }

//     <h2>Company Name</h2>
//     <div>
//         <p>Role</p>
//         <p>Applied Date</p>
//         <p>Job link</p>
//     </div>
// </div>
}


//setting date to current date in form

    const date = new Date();

    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const currentDate = yyyy + '-' + mm + '-' +  dd;

    // This arrangement can be altered based on how we want the date's format to appear.
    document.querySelector('#AppliedDate').value=currentDate



//adding to tracker

let form=document.querySelector('#form')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(CompanyName!=null & JobLink!=null){
        let CompanyName=document.querySelector('#CompanyName').value
        let JobLink=document.querySelector('#JobLink').value
        let AppliedDate=document.querySelector('#AppliedDate').value
        let Role = document.querySelector('#Role').value
        let Status="Applied"
        let data={CompanyName,JobLink,AppliedDate,Status,Role}
        //send a post re add

        async function addjob() {
            try {
                let url = 'https://job-tracker-yvvt.onrender.com/add';
                let response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
        
                let responseData = await response.json();
                console.log('Success:', responseData);
        
            } catch (error) {
                console.error('Error:', error);
            }
        }

        addjob()
        form.reset()
        document.querySelector('#AppliedDate').value=currentDate
        location.reload()
    }
    else{
        alert("Please fill details correctly!")
    }
})


//implementing search
companyNames=["zoho","airtel","hashagile"]
function search(compName){
    return companyNames.filter((Name)=>{
        return Name.includes(compName)
    })
}

// console.log(search("ai"))
