-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "contact_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message_id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    CONSTRAINT "contact_messages_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "contact_messages_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contact_messages_message_id_contact_id_key" ON "contact_messages"("message_id", "contact_id");
