import { Router } from "express";
import productAuthication from "../Middlewares/ProductAuth.js"

const router =Router();

router.get('/',productAuthication,(req,res)=>{
        // console.log('---- logged in user detail ---', req.user);

    res.status(200).json([
        {
            "name":"Apple",
            "price":120000
        },
        {
            "name":"Samusung",
            "price":73000
        }
    ])
})

export default router;