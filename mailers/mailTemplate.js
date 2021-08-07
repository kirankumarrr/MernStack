exports.mailCardTemplate = (cards) => {
  let htmlWrapper = `

  <h1>Card Status</h1>
  <table style="border-collapse: collapse;width: 100%;border:2px solid;">
  <thead>
    <tr>
      <th style="border-collapse: collapse;text-align: left;padding: 8px;border: 2px solid;">Name</th>
      <th style="border-collapse: collapse;text-align: left;padding: 8px;border: 2px solid;">Amount</th>
      <th style="border-collapse: collapse;text-align: left;padding: 8px;border: 2px solid;">Date</th>
    </tr>
   </thead>
   <tbody>`;

  cards.forEach((eachCard) => {
    htmlWrapper += `<tr>
    <td style="border-collapse: collapse;text-align: left;padding: 8px;border: 2px solid;">${eachCard.name}</td>
    <td style="border-collapse: collapse;text-align: left;padding: 8px;border: 2px solid;">${eachCard.amount}</td>
    <td style="border-collapse: collapse;text-align: left;padding: 8px;border: 2px solid;">${eachCard.date}</td>
  </tr>`;
  });

  htmlWrapper += `
  </tbody>
  </table>`;

//   console.log("htmlWrapper :", htmlWrapper);

  return htmlWrapper
};
