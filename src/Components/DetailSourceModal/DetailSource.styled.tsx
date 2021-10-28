import styled from 'styled-components';
import { Modal } from 'antd';

const DetailModal = styled(Modal)`
  .detail-booking {
    width: 100% !important;
    padding: 1rem;
    background-color: rgb(255, 243, 243);
    border-radius: 0.5rem;
    &__services {
      width: 100% !important;
      padding: 1rem;
      background-color: rgb(255, 243, 243);
      border-radius: 0.5rem;
    }
    &__title-customer {
      color: #16a085;
      font-weight: bold;
      padding: 0 0 0.5rem 0;
    }
    &__title-hotel {
      color: #16a085;
      font-weight: bold;
      padding: 0 0 0.5rem 0;
    }
    &__title-checkin {
      padding: 0 0 0.5rem 0;
      display: block;
    }
    &__title-checkout {
      padding: 0 0 0.5rem 0;
      display: block;
    }
    &__check-in {
      color: #16a085;
      font-weight: bold;
    }
    &__check-out {
      color: #16a085;
      font-weight: bold;
    }
    &__title-service {
      font-weight: bold;
    }
    &__title-extra-services {
      font-weight: bold;
    }

    &__title-coupon {
      font-weight: bold;
    }

    &__title-pay {
      font-weight: bold;
    }

    &__title-point {
      font-weight: bold;
    }

    &__announce-text {
      font-style: italic;
    }
    &__title-status {
      padding: 0 0 0.5rem 0;
      color: #faad14;
    }
    &__title-status-payment {
      padding: 0 0 0.5rem 0;
      color: #faad14;
    }
  }

  /* .detail-booking .ant-modal-title {
    color : #16a085;    

} */
`;
export default DetailModal;
