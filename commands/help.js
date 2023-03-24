//Help Command Begin -------------------------------------------------------------------------------------------------
function helpfs() {
    console.log(`
        List of commands available are:
            node main.js tree "directorypath"
            node main.js organize "directorypath"
            node main.js help
    `);
} //done

module.exports = {
    helpkey: helpfs
}
