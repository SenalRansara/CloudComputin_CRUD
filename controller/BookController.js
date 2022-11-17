const router = require("express").Router();
const Book = require("../model/BookModel");
const { v4: uuidv4 } = require("uuid");
//create router for add new Book
router.post("/book/save",async (req,res)=>{
    //console.log("ddd",req.body);
    const id = uuidv4();
    const title = req.body.title;
    const author = req.body.author;
    const cost = req.body.cost;

const newBook = new Book({
    id,
    title,
    author,
    cost,

})

//implementing method for adding Book data
try {
    Book.find({ id: newBook.id }, async (err, doc) => {
        if (Object.keys(doc).length == 0) {
            try {
                let response = await newBook.save();
                if (response)
                    //console.log(doc);
                    return res.status(201).send({ message: "new Book Added" });
            } catch (err) {
                console.log("error while saving", err);
                return res.status(500).send({ status: "Internal Server Error" });
            }
        }
        else {
            return res.status(400).send({ status: "Book already exist!" });
        }
    });
} catch (err) {
    console.log("error", err)
}
});

//router for retrieve data for Added Book Details
router.get("/book/get",async (req,res) => {

    try{
        const response = await Book.find();
        return res.status(200).send({
            status:"Success",
            data: response
        });
    }catch(error){
        console.log("Something went wrong while DB connection");
        return { ok: false};
    }
});

//router for update Book details
router.put("/book/update/:id",async (req,res) =>{
    const bookId = req.params.id;

    const{
        id,
        title,
        author,
        cost
    } = req.body;

    const Payload = {
        id,
        title,
        author,
        cost
    }
    //console.log("id123",recId);

    if(bookId){
        const response = await Book.findOneAndUpdate({id: bookId }, Payload).then(() =>{
            return res.status(200).send({
                status:"Book Successfully Updated!!"
            });
        }).catch((err) =>{
            return res.status(500).send({
                status:"Internal server Error"
            });
        })
    }
    return res.status(400).send({
        status:"Invalid Request"
    })
})

//router for delete Book 
router.post("/book/delete/:id", async (req, res) => {
    const bookId = req.params.id;

    if (bookId) {
        const response = await Book.findOneAndDelete({ id: bookId }).then(() => {
            return res.status(200).send({ status: "Success" });
        }).catch((err) => {
            return res.status(500).send({ status: "Internal Server Error" });
        })
    }
    return res.status(400).send({ status: "Invalid Request" });

});
module.exports = router;