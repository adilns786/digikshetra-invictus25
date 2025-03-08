
// import React, { useState, useEffect } from "react";
// import { db } from "../../Firebase/config";
// import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
// import { Button } from "@/components/ui/button";


// const VerifyTransactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [selectedDoc, setSelectedDoc] = useState(null);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "transactions"));
//         const transactionsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setTransactions(transactionsData);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     };
//     fetchTransactions();
//   }, []);

//   const handleApproval = async (transactionId, docKey, status) => {
//     try {
//       const transactionRef = doc(db, "transactions", transactionId);
//       await updateDoc(transactionRef, {
//         [`${docKey}.approved`]: status,
//       });
//       setTransactions((prev) =>
//         prev.map((t) =>
//           t.id === transactionId ? { ...t, [docKey]: { ...t[docKey], approved: status } } : t
//         )
//       );
//     } catch (error) {
//       console.error("Error updating document status:", error);
//     }
//   };

//   return (
//     <div className="p-6 space-y-6 bg-gray-100 rounded-lg shadow-lg">
//     <h2 className="text-2xl font-bold text-blue-600">Pending Transactions</h2>
//     {transactions.map((transaction) => (
//       <div key={transaction.id} className="border p-4 rounded-lg shadow-md bg-white">
//         <h3 className="font-semibold text-gray-800">Transaction ID: {transaction.id}</h3>
//         <table className="w-full border mt-4">
//           <thead>
//             <tr className="bg-blue-100">
//               <th className="border p-2 text-left text-gray-700">Document</th>
//               <th className="border p-2 text-left text-gray-700">Status</th>
//               <th className="border p-2 text-left text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(transaction).map(([key, value]) =>
//               value?.url ? (
//                 <tr key={key} className="hover:bg-gray-50">
//                   <td className="border p-2 text-gray-600">{key.replace(/([A-Z])/g, ' $1')}</td>
//                   <td className="border p-2 text-gray-600">{value.approved ? "✅ Approved" : "❌ Pending"}</td>
//                   <td className="border p-2 space-x-2">
//                     <Button asChild>
//                       <a href={value.url} download target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                         Download
//                       </a>
//                     </Button>
//                     <Button onClick={() => handleApproval(transaction.id, key, true)} className="bg-green-500 hover:bg-green-600 text-white">
//                       Approve
//                     </Button>
//                     <Button onClick={() => handleApproval(transaction.id, key, false)} className="bg-red-500 hover:bg-red-600 text-white">
//                       Reject
//                     </Button>
//                   </td>
//                 </tr>
//               ) : null
//             )}
//           </tbody>
//         </table>
//       </div>
//     ))}
//     {selectedDoc && (
//       <Modal open={!!selectedDoc} onClose={() => setSelectedDoc(null)}>
//         <img src={selectedDoc} alt="Document" className="w-full h-auto" />
//       </Modal>
//     )}
//   </div>
//   );
// };

// export default VerifyTransactions;
import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";

const VerifyTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  const handleApproval = async (transactionId, docKey, status) => {
    try {
      const transactionRef = doc(db, "transactions", transactionId);
      await updateDoc(transactionRef, {
        [`${docKey}.approved`]: status,
      });

      setTransactions((prev) => {
        return prev.map((t) => {
          if (t.id === transactionId) {
            const updatedTransaction = { ...t, [docKey]: { ...t[docKey], approved: status } };
            checkAndSendToLedger(updatedTransaction);
            return updatedTransaction;
          }
          return t;
        });
      });
    } catch (error) {
      console.error("Error updating document status:", error);
    }
  };

  const checkAndSendToLedger = async (transaction) => {
    const allApproved = Object.entries(transaction)
      .filter(([key, value]) => value?.url)
      .every(([key, value]) => value.approved);

    if (allApproved) {
      const payload = {
        dlid: transaction.id,
        sender: "Pranav Pol",
        receiver: "Aadil Shah",
        amount: transaction.price,
      };
      try {
        await fetch("http://127.0.0.1:8000/ledgers/add-transaction/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        console.log("Transaction sent to ledger:", payload);

        // Remove from state after sending to ledger
        setTransactions((prev) => prev.filter((t) => t.id !== transaction.id));
      } catch (error) {
        console.error("Error sending transaction to ledger:", error);
      }
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600">Pending Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-600">No pending transactions.</p>
      ) : (
        transactions.map((transaction) => {
          const allApproved = Object.entries(transaction)
            .filter(([key, value]) => value?.url)
            .every(([key, value]) => value.approved);

          return !allApproved ? (
            <div key={transaction.id} className="border p-4 rounded-lg shadow-md bg-white">
              <h3 className="font-semibold text-gray-800">Transaction ID: {transaction.id}</h3>
              <p className="text-gray-700">Amount: ₹{transaction.price}</p>
              <table className="w-full border mt-4">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border p-2 text-left text-gray-700">Document</th>
                    <th className="border p-2 text-left text-gray-700">Status</th>
                    <th className="border p-2 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(transaction).map(([key, value]) =>
                    value?.url ? (
                      <tr key={key} className="hover:bg-gray-50">
                        <td className="border p-2 text-gray-600">{key.replace(/([A-Z])/g, " $1").trim()}</td>
                        <td className="border p-2 text-gray-600">
                          {value.approved ? "✅ Approved" : "❌ Pending"}
                        </td>
                        <td className="border p-2 space-x-2">
                          <Button asChild>
                            <a
                              href={value.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Download
                            </a>
                          </Button>
                          <Button
                            onClick={() => handleApproval(transaction.id, key, true)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleApproval(transaction.id, key, false)}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            Reject
                          </Button>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          ) : null;
        })
      )}
    </div>
  );
};

export default VerifyTransactions;
