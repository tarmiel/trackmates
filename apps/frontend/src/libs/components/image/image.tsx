type Properties = {
	alt: string;
	height?: string;
	isCircular?: boolean;
	src: string;
	width?: string;
};

const Image: React.FC<Properties> = ({
	alt,
	height,
	src,
	width,
}: Properties) => {
	return <img alt={alt} height={height} src={src} width={width} />;
};

export { Image };
