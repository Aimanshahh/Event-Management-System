const Table = ({ columns, data, actions }) => (
  <div className="table-wrapper">
    <table className="table">
      <thead>
        <tr>
          {columns.map((col, idx) => <th key={idx}>{col.label}</th>)}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {columns.map((col, colIdx) => <td key={colIdx}>{col.render ? col.render(row) : row[col.key]}</td>)}
            {actions && (
              <td className="table-actions">
                {actions.map((action, actIdx) => (
                  <button key={actIdx} onClick={() => action.onClick(row)} className={`btn btn-sm btn-${action.variant || 'primary'}`}>
                    {action.label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
