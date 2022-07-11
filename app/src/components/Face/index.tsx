type Props = {
  image: string
}

export const Face: React.FC<Props> = ({ image }) => {
  return <img src={image} alt="Not Found" />
}