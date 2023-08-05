import Image from 'next/image';

interface Props {
    icon: any;
    alt?: string;
}

export function Icon({ icon, alt = 'any' }: Props) {
    return <Image src={icon} alt={alt} />;
}
