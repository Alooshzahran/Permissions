﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Entity.Migrations
{
    /// <inheritdoc />
    public partial class Initialize_05072023 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Module",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    File = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreationUserID = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyingUserID = table.Column<int>(type: "int", nullable: true),
                    ModifyingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteUserID = table.Column<int>(type: "int", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Module", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreationUserID = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyingUserID = table.Column<int>(type: "int", nullable: true),
                    ModifyingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteUserID = table.Column<int>(type: "int", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreationUserID = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyingUserID = table.Column<int>(type: "int", nullable: true),
                    ModifyingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteUserID = table.Column<int>(type: "int", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ModuleProperties",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ControllerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ActionName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModuleID = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreationUserID = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyingUserID = table.Column<int>(type: "int", nullable: true),
                    ModifyingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteUserID = table.Column<int>(type: "int", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModuleProperties", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Module_Module_Properties",
                        column: x => x.ModuleID,
                        principalTable: "Module",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    ModuleID = table.Column<int>(type: "int", nullable: false),
                    RoleID = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreationUserID = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyingUserID = table.Column<int>(type: "int", nullable: true),
                    ModifyingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteUserID = table.Column<int>(type: "int", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Module_UserRole",
                        column: x => x.ModuleID,
                        principalTable: "Module",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Role_UserRole",
                        column: x => x.RoleID,
                        principalTable: "Role",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_User_UserRole",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ModulePropertiesRole",
                columns: table => new
                {
                    ModulePropertiesID = table.Column<int>(type: "int", nullable: false),
                    RoleID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModulePropertiesRole", x => new { x.ModulePropertiesID, x.RoleID });
                    table.ForeignKey(
                        name: "FK_ModulePropertiesRole_ModuleProperties_ModulePropertiesID",
                        column: x => x.ModulePropertiesID,
                        principalTable: "ModuleProperties",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ModulePropertiesRole_Role_RoleID",
                        column: x => x.RoleID,
                        principalTable: "Role",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "ID", "CreationDate", "CreationUserID", "DeleteDate", "DeleteUserID", "IsDeleted", "ModifyingDate", "ModifyingUserID", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 7, 5, 10, 37, 38, 420, DateTimeKind.Local).AddTicks(469), 1, null, null, false, null, null, "Admin" },
                    { 2, new DateTime(2023, 7, 5, 10, 37, 38, 420, DateTimeKind.Local).AddTicks(479), 1, null, null, false, null, null, "Creator" },
                    { 3, new DateTime(2023, 7, 5, 10, 37, 38, 420, DateTimeKind.Local).AddTicks(480), 1, null, null, false, null, null, "Editor" },
                    { 4, new DateTime(2023, 7, 5, 10, 37, 38, 420, DateTimeKind.Local).AddTicks(482), 1, null, null, false, null, null, "Viewer" }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "ID", "CreationDate", "CreationUserID", "DeleteDate", "DeleteUserID", "Email", "IsActive", "IsDeleted", "ModifyingDate", "ModifyingUserID", "Name" },
                values: new object[] { 1, new DateTime(2023, 7, 5, 7, 37, 38, 420, DateTimeKind.Utc).AddTicks(403), 1, null, null, "info@adaaapps.com", true, false, null, null, "Admin" });

            migrationBuilder.CreateIndex(
                name: "IX_ModuleProperties_ModuleID",
                table: "ModuleProperties",
                column: "ModuleID");

            migrationBuilder.CreateIndex(
                name: "IX_ModulePropertiesRole_RoleID",
                table: "ModulePropertiesRole",
                column: "RoleID");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_ModuleID",
                table: "UserRole",
                column: "ModuleID");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleID",
                table: "UserRole",
                column: "RoleID");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_UserID",
                table: "UserRole",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ModulePropertiesRole");

            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.DropTable(
                name: "ModuleProperties");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Module");
        }
    }
}
