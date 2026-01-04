import { Card, Spinner } from "@heroui/react";

export function AiThinkingOverlay() {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-500">
            <Card className="p-8 border-none bg-white/80 shadow-2xl flex flex-col items-center gap-4 scale-110">
                <div className="relative flex items-center justify-center">
                    <Spinner
                        size="lg"
                        color="warning"
                        labelColor="warning"
                        classNames={{
                            circle1: "border-b-amber-600",
                            circle2: "border-b-amber-600"
                        }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] font-black text-amber-800 tracking-tighter">AI</span>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
                        AI is thinking...
                    </p>
                    <p className="text-xs text-amber-600/70 font-medium">Best move calculated</p>
                </div>
            </Card>
        </div>
    );
}