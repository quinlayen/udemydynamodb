// function doStuff(data, callback) {
//     callback('done');
// }

// doStuff(false, result=>console.log(result));

function doStuff(data) {
    return new Promise((res, rej) =>{
        let successMessage = {
            status: 'success',
            message: 'all is well'
        };

        let errorMessage = {
            status: 'error',
            message: 'Oops, there was an error'
        };

        if(typeof data === 'boolean' && data === true) {
            res(successMessage);
        } else {
            rej(errorMessage);
        }
    })
}


doStuff(true).then(
    ()=>{
        console.log("First doStuff resolved");
        return doStuff(false);
    }
).then(
    ()=>{
        console.log("Second doStuff resolved");
    }
).catch(
    ()=>{
        console.log("An error occured");
    }
)


// doStuff(false)
// .then((successMessage) =>{
//     console.log(successMessage);
// },(errorMessage)=>{
//     console.log(errorMessage);
// })