// import { json } from "body-parser";
import incomeModel from "../models/incomeModel.js";
import XLXS from "xlsx";
import getDateRange from "../utils/dataFilter.js";

//add income
export const addIncome = async (req, res) => {
const userId = req.user._id;
const {description, amount, category, date} = req.body;

try{
    if(!description || !amount || !category || !date) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }

    const newIncome = new incomeModel({
        userId,
        description,
        amount,
        category,
        date: new Date(date)
    });
    await newIncome.save();
    res.status(201).json({
        success: true,
        message: 'Income added successfully',
        income: newIncome
    });
}

catch (error) {
    console.error('Error adding income:', error);
    res.status(500).json({
        success: false,
        message: 'Error adding income'
    });
}
}

//get all income
export const getIncomes = async (req, res) => {
    const userId = req.user._id;

    try{
        const incomes = await incomeModel.find({ userId }).sort({ date: -1 });
        res.json(incomes);
    }
    catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching incomes'
        });
    }
}

//update income
export const updateIncome = async (req, res) => {
    const {id} = req.params;
    const userId = req.user._id;
    const {description, amount} = req.body;

    try{
        const updatedIncome = await incomeModel.findOneAndUpdate({
            _id: id, userId
        }, {
            description, amount
        }, { new: true });      
        
        if(!updatedIncome) {
            return res.status(404).json({
                success: false,
                message: 'Income not found'
            });
        }

        res.json({
            success: true, 
            message: "Income updated successfully",
            data: updatedIncome
        })
    }

    catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching incomes'
        });
    }
}

//to delete an income

export const deleteIncome = async (req, res) =>{
    try{
        const income = await incomeModel.findByIdAndDelete({
            _id: req.params.id
        })
        if(!income){
            return res.status(404).json({
                success: false,
                message: "Income not found"
            })
        }

        return res.json({
            success: true,
            message: "Income deleted successfully"
        })
    }
    catch (error){
        console.error('Error fetching incomes:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching incomes'
        });
    }
}

//to download excel sheet

export const downloadIncomeExcel = async (req,res) =>{
    const userId = req.user._id;
     try{
        const income = await incomeModel.find({userId}).sort({date: -1});
        const excelData = income.map((inc) => ({
            Description: inc.description,
            Amount: inc.amount,
            Category: inc.category,
            Date: new Date(inc.date).toLocaleDateString()
        }));

        const worksheet = XLXS.utils.json_to_sheet(excelData);
        const workbook = XLXS.utils.book_new();
        XLXS.utils.book_append_sheet(workbook, worksheet, "incomeModel");
        XLXS.writeFile(workbook, "income_details.xlsx");
        res.download("income_details.xlsx");
     }

     catch(error){
        console.error('Error downloading income excel:', error);
        res.status(500).json({
            success: false,
            message: 'Error downloading income excel'
        });
     }

}

//to get income overview
export const getIncomeOverview = async (req, res) => {
    try{
        const userId = req.user._id;
        const {range = "monthly"} = req.query;
        const {start, end} = getDateRange(range);

        const incomes = await incomeModel.find({
            userId,
            date: {
                $gte: start,
                $lte: end
            }
        }).sort({date: -1});

        const totalIncome = incomes.reduce((acc, cur) => acc + cur.amount, 0);
        const averageIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;
        const numberOfTransactions = incomes.length;

        const recentTransactions = incomes.slice(0, 9);

        const bySource = {};
        for (const inc of incomes) {
            const cat = inc.category || "Other";
            bySource[cat] = (bySource[cat] || 0) + Number(inc.amount || 0);
        }
        const categoryDistribution = Object.entries(bySource).map(([category, amount]) => ({
            category,
            amount,
            percent: totalIncome === 0 ? 0 : Number(((amount / totalIncome) * 100).toFixed(1)),
        }));

        res.json({
            success: true,
            data: {
                totalIncome,
                averageIncome,
                numberOfTransactions,
                recentTransactions,
                categoryDistribution,
                range
            }
        })
    }
    catch(error){
        console.error('Error fetching income overview:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching income overview'
        });
    }
}