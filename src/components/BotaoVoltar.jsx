import React from 'react';

const BotaoVoltar = () => {
  const handleVoltar = () => {
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleVoltar}
      style={{
        padding: '8px 16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '16px'
      }}
    >
      ⬅ Voltar para Home
    </button>
  );
};

export default BotaoVoltar;
