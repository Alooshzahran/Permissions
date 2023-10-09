using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Entity.Migrations
{
    /// <inheritdoc />
    public partial class _05072023_1047 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Module_Module_Properties",
                table: "ModuleProperties");

            migrationBuilder.DropForeignKey(
                name: "FK_Module_UserRole",
                table: "UserRole");

            migrationBuilder.DropForeignKey(
                name: "FK_Role_UserRole",
                table: "UserRole");

            migrationBuilder.DropForeignKey(
                name: "FK_User_UserRole",
                table: "UserRole");

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 10, 47, 19, 710, DateTimeKind.Local).AddTicks(5078));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 10, 47, 19, 710, DateTimeKind.Local).AddTicks(5087));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 10, 47, 19, 710, DateTimeKind.Local).AddTicks(5089));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 10, 47, 19, 710, DateTimeKind.Local).AddTicks(5090));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 7, 47, 19, 710, DateTimeKind.Utc).AddTicks(5000));

            migrationBuilder.AddForeignKey(
                name: "FK_Module_Module_Properties",
                table: "ModuleProperties",
                column: "ModuleID",
                principalTable: "Module",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Module_UserRole",
                table: "UserRole",
                column: "ModuleID",
                principalTable: "Module",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Role_UserRole",
                table: "UserRole",
                column: "RoleID",
                principalTable: "Role",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_User_UserRole",
                table: "UserRole",
                column: "UserID",
                principalTable: "User",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Module_Module_Properties",
                table: "ModuleProperties");

            migrationBuilder.DropForeignKey(
                name: "FK_Module_UserRole",
                table: "UserRole");

            migrationBuilder.DropForeignKey(
                name: "FK_Role_UserRole",
                table: "UserRole");

            migrationBuilder.DropForeignKey(
                name: "FK_User_UserRole",
                table: "UserRole");

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 10, 37, 38, 420, DateTimeKind.Local).AddTicks(469));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 10, 37, 38, 420, DateTimeKind.Local).AddTicks(479));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 10, 37, 38, 420, DateTimeKind.Local).AddTicks(480));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 10, 37, 38, 420, DateTimeKind.Local).AddTicks(482));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 7, 37, 38, 420, DateTimeKind.Utc).AddTicks(403));

            migrationBuilder.AddForeignKey(
                name: "FK_Module_Module_Properties",
                table: "ModuleProperties",
                column: "ModuleID",
                principalTable: "Module",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Module_UserRole",
                table: "UserRole",
                column: "ModuleID",
                principalTable: "Module",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Role_UserRole",
                table: "UserRole",
                column: "RoleID",
                principalTable: "Role",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_UserRole",
                table: "UserRole",
                column: "UserID",
                principalTable: "User",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
