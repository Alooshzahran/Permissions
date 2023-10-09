using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Entity.Migrations
{
    /// <inheritdoc />
    public partial class _02072023_1049 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Module_UserRole",
                table: "UserRole");

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 2, 10, 49, 41, 989, DateTimeKind.Local).AddTicks(3745));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 7, 2, 10, 49, 41, 989, DateTimeKind.Local).AddTicks(3755));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 7, 2, 10, 49, 41, 989, DateTimeKind.Local).AddTicks(3757));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 7, 2, 10, 49, 41, 989, DateTimeKind.Local).AddTicks(3758));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 2, 7, 49, 41, 989, DateTimeKind.Utc).AddTicks(3670));

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_ModuleID",
                table: "UserRole",
                column: "ModuleID");

            migrationBuilder.AddForeignKey(
                name: "FK_Module_UserRole",
                table: "UserRole",
                column: "ModuleID",
                principalTable: "Module",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Module_UserRole",
                table: "UserRole");

            migrationBuilder.DropIndex(
                name: "IX_UserRole_ModuleID",
                table: "UserRole");

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 6, 26, 10, 41, 16, 486, DateTimeKind.Local).AddTicks(9809));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 6, 26, 10, 41, 16, 486, DateTimeKind.Local).AddTicks(9823));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 6, 26, 10, 41, 16, 486, DateTimeKind.Local).AddTicks(9826));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 6, 26, 10, 41, 16, 486, DateTimeKind.Local).AddTicks(9828));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 6, 26, 7, 41, 16, 486, DateTimeKind.Utc).AddTicks(9683));

            migrationBuilder.AddForeignKey(
                name: "FK_Module_UserRole",
                table: "UserRole",
                column: "UserID",
                principalTable: "Module",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
