import { Group, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

type Props = {
  isPending?: boolean;
  backLink?: string;
  handleCancel?: () => void;
  justify?: string;
  handleSubmit?: any;
  disabled?: boolean;
  cancelBtnTitle?: string;
  submitBtnTitle?: string;
};

export const FormButton = ({
  isPending,
  backLink,
  handleCancel,
  justify = 'flex-end',
  handleSubmit,
  disabled,
  cancelBtnTitle,
  submitBtnTitle
}: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (backLink) {
      navigate(backLink);
    } else if (handleCancel) {
      handleCancel();
    } else {
      navigate(-1);
    }
  };
  const cancelTitleClassName = cancelBtnTitle?.replace(/\s+/g, '-').toLowerCase() || "cancel-btn";
  const submitBtnTitleClassName = submitBtnTitle?.replace(/\s+/g, '-').toLowerCase() || 'submit-btn';
  return (
    <Group justify={justify} mt="xl">
      <Button size="sm" color="gray" className={cancelTitleClassName} variant="filled" onClick={handleClick}>
        {cancelBtnTitle ? cancelBtnTitle : 'Cancel'}
      </Button>
      <Button type="submit" size="sm" className={submitBtnTitleClassName} loading={isPending} onSubmit={handleSubmit} disabled={disabled}>
        {submitBtnTitle ? submitBtnTitle : 'Submit'}
      </Button>
    </Group>
  );
};
