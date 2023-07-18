const mockCoworkings = require('./mock_coworkings')
const express = require('express')
const app = express()
const port = 3001

app.use(express.json())

app.get('/api/coworkings/:id', (req, res) => {
    // Afficher le nom du coworking qui correspond a l'id en parametre 
    let targetCoworking = mockCoworkings.find(el => el.id === parseInt(req.params.id));
    if (targetCoworking) {
        return res.json({ message: `L'élément ayant pour id ${targetCoworking.id} a bien été récupéré.`, data: targetCoworking })
    } else {
        return res.json({ message: `L'élément ayant pour id ${req.params.id} n'a pas pu etre récupéré.` })
    }

})


// let myIdentity = [2, 3]

// let nb1 = 3
// let nb2 = nb1
// nb2 += 4

// let myIdentity2 = [...myIdentity];
// myIdentity2.push(4)

// console.log(myIdentity2, myIdentity)

// get = donner

app.get('/api/coworkings', (req, res) => {
    const criterium = req.query.criterium ? req.query.criterium : 'superficy'
    const orderBy = req.query.orderBy || 'ASC'

    console.log('exemple : ', criterium, orderBy)

    const arrToSort = [...mockCoworkings];
    // if ((orderBy === 'ASC' || orderBy === 'DESC') && (criterium === 'superficy' || criterium === 'capacity')) {

    //     arrToSort.sort((a, b) => {
    //         return orderBy === 'DESC' ? b[criterium] - a[criterium] : a[criterium] - b[criterium]
    //     })
    // }

    res.json(arrToSort)
})

// post = rajouter

app.post('/api/coworkings', (req, res) => {
    const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
    const newCoworking = { id: newId, ...req.body }
    mockCoworkings.push(newCoworking);

    return res.json({ message: `Un nouveau coworking numero ${newCoworking.id} a été créé.`, data: newCoworking })
})

// put = modifié
app.put('/api/coworkings/:id', (req, res) => {
    const indexInArray = mockCoworkings.findIndex((element) => {
        return element.id === parseInt(req.params.id)

    })
    let updatedCoworking = { ...mockCoworkings[indexInArray], ...req.body }
    mockCoworkings[indexInArray] = updatedCoworking;

    return res.json({
        message: `Le coworking ${updatedCoworking.name} a été modifié`,
        data: updatedCoworking
    })
})

// delete = supprimmer

app.delete('/api/coworkings/:id', (req, res) => {
    const indexInArray = mockCoworkings.findIndex((element) => {
        return element.id === parseInt(req.params.id)
    })
    if (indexInArray === -1) {
        return res.json({ message: `L'id ${req.params.id} ne correspond à aucun élément.` })
    } else {
        const deletedeCoworkings = mockCoworkings.splice(indexInArray, 1)
        return res.json({
            message: `L'élément id ${req.params.id} a bien été supprimé`,
            data: deletedeCoworkings[0]
        })
    }
})
// creer un nouveau endpoint pour afficher le tableau entier en json

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})