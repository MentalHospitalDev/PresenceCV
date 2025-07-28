import SocialForm from "@/components/ui/Forms/SocialForm";
import { FadeIn } from "@/components/ui/FadeIn";

export default function Hero() {
    return (
        <section className="pt-40 md:pt-48 pb-20 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-7xl font-bold">
                        <FadeIn
                            as="span"
                            direction="up"
                            distance={32}
                            duration={0.5}
                            delay={0.1}
                            className="inline-block bg-gradient-to-r from-mirage-100 to-mirage-200 bg-clip-text text-transparent pb-5"
                        >
                            Build a polished resume
                        </FadeIn>

                        <br />

                        <FadeIn
                            as="span"
                            direction="up"
                            distance={32}
                            duration={0.5}
                            delay={0.3}
                            className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent pb-5"
                        >
                            instantly from your GitHub
                        </FadeIn>
                    </h1>

                    <FadeIn
                        as="p"
                        direction="up"
                        distance={32}
                        duration={0.5}
                        delay={0.4}
                        className="text-lg md:text-xl text-mirage-300 mb-12 max-w-4xl mx-auto"
                    >
                        Perfect for no experience students, new grads, and self-taught devs.

                    </FadeIn>

                    <SocialForm />
                </div>
            </div>
        </section>
    );
}
