import { ArrowRight, FileText, Github, Sparkles } from 'lucide-react';

const Home = () => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-indigo-50 to-purple-50">
            <header className="relative overflow-hidden">

                <div className="relative z-10 text-center px-6 py-20 max-w-4xl mx-auto">
                    <div
                        className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-red-200 rounded-full px-4 py-2 mb-6">
                        <Sparkles className="w-4 h-4 text-red-600"/>
                        <span
                            className="text-sm text-red-700 font-medium">Perfect for j*bless students & self-taught devs</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                        Presence
                        <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                            CV
                        </span>
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <button
                            className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                            <Github className="w-5 h-5"/>
                            Generate My Resume
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                        </button>
                        <button
                            className="text-gray-300 hover:text-gray-400 px-6 py-4 flex items-center gap-2 transition-colors">
                            <FileText className="w-5 h-5"/>
                            View Sample Resume
                        </button>
                    </div>

                </div>

            </header>

        </div>
    );
};

export default Home;