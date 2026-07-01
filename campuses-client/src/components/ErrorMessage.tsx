
interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({message}: ErrorMessageProps) => {
  return (
    <div>
        <h1 className="animate-pulse">An issue has occurred: {message}</h1>

    </div>
  )
}

export default ErrorMessage