import React from 'react';
import './UserInfo.css';

const UserInfo = () => {
  return (
    <div className="user-info-container">
      <div className="user-greeting">
        <p>Olá, Daniela</p>
        <span className="points-link">Ver meus pontos</span>
      </div>
      <div className="delivery-address">
        Entregando no endereço: <strong>Rua Mesquita, 248</strong> <span className="change-link">Alterar</span>
      </div>
    </div>
  );
};

export default UserInfo;