const {execSync} = require('child_process'),
    runCommand = command => {
        console.log(command, "...")
        execSync(command)
        console.log(command, "done")
    }


runCommand("npm i")
runCommand("npm run build")