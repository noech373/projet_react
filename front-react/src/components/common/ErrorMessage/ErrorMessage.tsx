import {FC} from'react';

interface ErrorMessageProps {
    message: string;
  }

export const ErrorMessage: FC <ErrorMessageProps> = ({ message }) => (
    <div className="text-center py-8">
      <p className="text-red-500">{message}</p>
    </div>
  );
export default ErrorMessage;