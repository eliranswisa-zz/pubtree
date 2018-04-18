const express = require('express')
const async = require('async')
const Pubgapi = require('pubg-api')

const router = express.Router()
const apiInstance = new Pubgapi(process.env.API_KEY, {defaultShard: 'pc-eu'})

filterMatchData = function filterMatchDataByMatch(match, playerId) {
    matchData = {}
    matchData.game_mode = match.raw.data.attributes.gameMode
    matchData.match_id = match.raw.data.id
    matchData.duration = match.raw.data.attributes.duration
    matchData.createdAt = match.raw.data.attributes.createdAt

    includedData = match.raw.included
    participantData = includedData.filter(participant => {
        return (participant.type == "participant" && participant.attributes.stats.playerId === playerId)
    })
    console.log(participantData[0])
    matchData.winPlace = participantData[0].attributes.stats.winPlace
    matchData.kills = participantData[0].attributes.stats.kills
    return matchData
}

getMatchesData = function getMatchesData(data, maxMatches = 3) {
    return new Promise((resolve, reject) => {
        slicedMatches = data.matches.slice(0, maxMatches)
        responseMatches = []
        async.each(slicedMatches, (match, callback) => {
            apiInstance
                .loadMatchById(match.id)
                .then(match => {
                    responseMatches.push(filterMatchData(match, data.playerId))
                    callback()
                })
                    .catch(err => reject(err))
            }, (err) => {
                if (err)
                    reject(err)
                
                resolve(responseMatches)
            }
        )
    })
}

router.get('/player/', (req, res) => {
    requestedName = req.headers.playername
    options = {
        "playerNames" : requestedName
    }
    data = {}
    apiInstance
        .searchPlayers(options)
        .then(player => {
            data.playerId = player.data[0].id
            data.matches = player.data[0].relationships.matches.data
            return data
        })
        .then(data => getMatchesData(data))
        .then(matches => res.json(matches))
        .catch(err => res.json(err))
})

module.exports = router