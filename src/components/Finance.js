import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Download, Plus, Calendar, DollarSign, Filter } from 'lucide-react';

const Finance = ({ transactions = [] }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [newTransaction, setNewTransaction] = useState({
    type: 'รายรับ',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const filteredTransactions = transactions.filter(t => 
    filterType === 'all' || t.type === filterType
  );

  const totalRevenue = transactions.filter(t => t.type === 'รายรับ').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.type === 'รายจ่าย').reduce((sum, t) => sum + t.amount, 0));
  const netProfit = totalRevenue - totalExpense;

  const handleAddTransaction = () => {
    if (!newTransaction.category || !newTransaction.amount || !newTransaction.description) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    
    alert('บันทึกรายการสำเร็จ!');
    setShowAddForm(false);
    setNewTransaction({
      type: 'รายรับ',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">บัญชีและการเงิน</h2>
          <p className="text-sm text-gray-500 mt-1">จัดการรายรับ-รายจ่าย และรายงานทางการเงิน</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          เพิ่มรายการ
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 font-bold">รายรับทั้งหมด</p>
              <p className="text-3xl font-black mt-2">฿{totalRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp size={32} className="opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 font-bold">รายจ่ายทั้งหมด</p>
              <p className="text-3xl font-black mt-2">฿{totalExpense.toLocaleString()}</p>
            </div>
            <TrendingDown size={32} className="opacity-80" />
          </div>
        </div>
        <div className={`bg-gradient-to-br ${netProfit >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} p-6 rounded-2xl shadow-lg text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 font-bold">กำไรสุทธิ</p>
              <p className="text-3xl font-black mt-2">฿{netProfit.toLocaleString()}</p>
            </div>
            <DollarSign size={32} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Filter and Export */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-3">
          <Filter size={16} className="text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">ทุกประเภท</option>
            <option value="รายรับ">รายรับ</option>
            <option value="รายจ่าย">รายจ่าย</option>
          </select>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl font-bold text-sm hover:bg-green-100 transition-colors">
          <Download size={16} /> ส่งออก Excel
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">ยังไม่มีรายการธุรกรรม</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">วันที่</th>
                  <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">ประเภท</th>
                  <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">หมวดหมู่</th>
                  <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">รายละเอียด</th>
                  <th className="text-right p-4 text-xs font-bold text-gray-600 uppercase">จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, idx) => (
                  <tr key={transaction.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} className="text-gray-400" />
                        {transaction.date}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        transaction.type === 'รายรับ' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-medium">{transaction.category}</td>
                    <td className="p-4 text-sm">{transaction.description}</td>
                    <td className="p-4 text-right">
                      <span className={`font-bold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}฿{Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddForm(false)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">เพิ่มรายการธุรกรรม</h3>
            <div className="space-y-4">
              <select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="รายรับ">รายรับ</option>
                <option value="รายจ่าย">รายจ่าย</option>
              </select>
              <input
                type="text"
                placeholder="หมวดหมู่ (เช่น ค่าห้องพัก, ซ่อมบำรุง) *"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="number"
                placeholder="จำนวนเงิน *"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="รายละเอียด *"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 border rounded-xl hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleAddTransaction}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;
              <tr>
                <th className="text-left p-4 text-xs font-black text-slate-600 uppercase">วันที่</th>
                <th className="text-left p-4 text-xs font-black text-slate-600 uppercase">ประเภท</th>
                <th className="text-left p-4 text-xs font-black text-slate-600 uppercase">หมวดหมู่</th>
                <th className="text-left p-4 text-xs font-black text-slate-600 uppercase">รายละเอียด</th>
                <th className="text-right p-4 text-xs font-black text-slate-600 uppercase">จำนวนเงิน</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 20).map((trans, idx) => (
                <tr key={trans.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="p-4 text-sm">{trans.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${trans.type === 'รายรับ' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                      {trans.type}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{trans.category}</td>
                  <td className="p-4 text-sm">{trans.description}</td>
                  <td className={`p-4 text-right font-black ${trans.type === 'รายรับ' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {trans.type === 'รายรับ' ? '+' : ''}฿{Math.abs(trans.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Finance;
