import dayjs from 'dayjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const today = dayjs().startOf('day').toDate()
const yesterday = dayjs().add(-1, 'day').startOf('day').toDate()

async function run() {
    await prisma.contact.deleteMany()
    await prisma.contactMessage.deleteMany()
    await prisma.message.deleteMany()

    /**
     * Create contacts
     */
    const contacts = await Promise.all([
        prisma.contact.create({
            data: {
                email: 'fulano01@gmail.com',
                name: 'João Pedro',
            },
        }),

        prisma.contact.create({
            data: {
                email: 'fulano02@gmail.com',
                name: 'Rodrigo Santos',
            },
        }),

        prisma.contact.create({
            data: {
                email: 'fulano03@gmail.com',
                name: 'Jefferson Figueiredo',
            },
        }),
    ])

    const [firstContactId, secondContactId, thirdContactId] = contacts.map(
        (c) => c.id
    )

    /**
     * Create messages
     */
    await Promise.all([
        prisma.message.create({
            data: {
                createdAt: yesterday,
                title: 'Promoção Monitor Gamer Mancer Valak',
                content:
                    'Monitor Gamer Mancer Valak, 23.6 Pol VA, Curvo, FHD, 1ms, 180Hz, FreeSync e G-Sync, HDMI/DP, MCR-VLK24-BL01. \n\n O Monitor Mancer Valak foi criado e desenvolvido para trazer uma experiência única e imersiva, levando você a desbravar novas aventuras e conquistar novos mundos enquanto aproveita seus jogos favoritos.',
                contactMessages: {
                    create: [
                        { contact_id: firstContactId },
                        { contact_id: secondContactId },
                        { contact_id: thirdContactId },
                    ],
                },
            },
        }),

        prisma.message.create({
            data: {
                createdAt: today,
                title: 'Promoção Fone de Ouvido WAAW by ALOK SENSE 200HB Headphone Bluetooth...',
                content:
                    'Fone de Ouvido WAAW by ALOK SENSE 200HB Headphone Bluetooth, Microfone e Toque inteligente, Conexão Multipontos, Preto e Verde, Regulável. \n\n Você tem o dia inteiro de muita música, pois são 25 horas reprodução sem parar. \n\n Possui conexão multipontos permite que o fone de ouvido Bluetooth se conecte em dois aparelhos simultaneamente.',
                contactMessages: {
                    create: [
                        { contact_id: firstContactId },
                        { contact_id: secondContactId },
                    ],
                },
            },
        }),

        prisma.message.create({
            data: {
                createdAt: today,
                title: 'Compre agora mesmo * Mind Reader French Press Cafeteira de 765 g, vidro',
                content:
                    'Observação: 1) Uma moagem muito grossa, muito pouco café ou calcar insuficientemente os grãos antes da preparação podem causar pressão inadequada para uma bebida adequada. 2) É importante observar que a quantidade de café expresso extraído variará dependendo do tamanho e da quantidade, e pode ser necessário reprogramar quando o tamanho e a quantidade forem ajustados. \n\n Café e chá de qualidade: quem disse que você só pode tomar café ou chá instantâneo em casa? Agora prepare sua bebida pessoal de alta qualidade com sua própria prensa francesa.',
            },
        }),
    ])
}

run()
