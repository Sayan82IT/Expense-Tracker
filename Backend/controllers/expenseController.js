import expenseModel from "../models/expenseModel.js";
import getDataRange from "../utils/dataFilter.js";
import XLXS from "xlsx";

//add expense
export const addExpense = async (req, res) => {
    const userId = req.user._id;
    const {description, amount, category, date} = req.body;

    try{
        if(!description || !amount || !category || !date) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

            const newExpense = new expenseModel({
                userId,
                description,
                amount,
                category,
                date: new Date(date)
            });
            await newExpense.save();
            res.status(201).json({
                success: true,
                message: 'Expense added successfully',
                expense: newExpense
            });
    }
    catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding expense'
        });
    }
}

//to all expenses
export const getAllExpense = async (req, res) => {
    const userId = req.user._id;
    
        try{
            const expenses = await expenseModel.find({ userId }).sort({ date: -1 });
            res.json(expenses);
        }
        catch (error) {
            console.error('Error fetching expenses:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching expenses'
            });
        }
}

//update the expenses
export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { description, amount } = req.body;

    try{
        const updatedExpense = await expenseModel.findOneAndUpdate({
            _id: id, userId
        }, {
            description, amount
        }, { new: true });       
        
        if(!updatedExpense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        res.json({
            success: true, 
            message: "Expense updated successfully",
            data: updatedExpense
        })

    }
    catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating expense'
        });
    }
}

//delete the expenses
export const deleteExpense = async (req, res) => {
    try{
        const expense = await expenseModel.findByIdAndDelete({
            _id: req.params.id
        })
        if(!expense){
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            })
        }

        return res.json({
            success: true,
            message: "Expense deleted successfully"
        })
    }
    catch (error){
        console.error('Error fetching expenses:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching expenses'
        });
    }
}

//download expenses

export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;
     try{
        const expenses = await expenseModel.find({userId}).sort({date: -1});
        const excelData = expenses.map((exp) => ({
            Description: exp.description,
            Amount: exp.amount,
            Category: exp.category,
            Date: new Date(exp.date).toLocaleDateString()
        }));

        const worksheet = XLXS.utils.json_to_sheet(excelData);
        const workbook = XLXS.utils.book_new();
        XLXS.utils.book_append_sheet(workbook, worksheet, "expenseModel");
        XLXS.writeFile(workbook, "expense_details.xlsx");
        res.download("expense_details.xlsx");
     }

     catch(error){
        console.error('Error downloading expense excel:', error);
        res.status(500).json({
            success: false,
            message: 'Error downloading expense excel'
        });
     }
}

//to get overview of expenses

export const getExpenseOverview = async (req, res) => {
    try{
        const userId = req.user._id;
        const {range = "monthly"} = req.query;
        const {start, end} = getDataRange(range);

        const expense = await expenseModel.find({
            userId,
            date: {
                $gte: start,
                $lte: end
            }
        }).sort({date: -1});

        const totalExpense = expense.reduce((acc, cur) => acc + cur.amount, 0);
        const averageExpense = expense.length > 0 ? totalExpense / expense.length : 0;
        const numberOfTransactions = expense.length;
        const recentTransactions = expense.slice(0, 5);

        const byCategory = {};
        for (const exp of expense) {
            const cat = exp.category || "Other";
            byCategory[cat] = (byCategory[cat] || 0) + Number(exp.amount || 0);
        }
        const categoryDistribution = Object.entries(byCategory).map(([category, amount]) => ({
            category,
            amount,
            percent: totalExpense === 0 ? 0 : Number(((amount / totalExpense) * 100).toFixed(1)),
        }));

        res.json({
            success: true,
            data: {
                totalExpenses: totalExpense,
                averageExpense: averageExpense,
                numberOfTransactions: numberOfTransactions,
                recentTransactions: recentTransactions,
                categoryDistribution,
                range: range
            }
        })
    }
    catch(error){
        console.error('Error fetching expense overview:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching expense overview'
        });
    }
}