export function AmbientBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden bg-cream -z-10">
            {/* Blob 1 - Brick Red */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full bg-red-400/30 animate-blob-1"
                style={{
                    filter: 'blur(120px)',
                    top: '-10%',
                    left: '-10%',
                }}
            />

            {/* Blob 2 - Retro Green */}
            <div
                className="absolute w-[400px] h-[400px] rounded-full bg-emerald-400/25 animate-blob-2"
                style={{
                    filter: 'blur(100px)',
                    top: '50%',
                    right: '-5%',
                }}
            />

            {/* Blob 3 - Warm Orange */}
            <div
                className="absolute w-[450px] h-[450px] rounded-full bg-orange-300/30 animate-blob-3"
                style={{
                    filter: 'blur(110px)',
                    bottom: '-15%',
                    left: '30%',
                }}
            />

            {/* Blob 4 - Indigo */}
            <div
                className="absolute w-[350px] h-[350px] rounded-full bg-indigo-300/20 animate-blob-4"
                style={{
                    filter: 'blur(100px)',
                    top: '20%',
                    left: '60%',
                }}
            />
        </div>
    );
}
